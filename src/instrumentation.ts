import { Resource } from '@opentelemetry/resources';
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions';
import {
  // BatchSpanProcessor,
  SimpleSpanProcessor,
  WebTracerProvider,
} from '@opentelemetry/sdk-trace-web';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
// import { FetchInstrumentation } from "@opentelemetry/instrumentation-fetch";
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { getWebAutoInstrumentations } from '@opentelemetry/auto-instrumentations-web';
import { ZoneContextManager } from '@opentelemetry/context-zone';
// import { DocumentLoadInstrumentation } from "@opentelemetry/instrumentation-document-load";

const setupOTelSDK = () => {
  const resource = Resource.default().merge(
    new Resource({
      [ATTR_SERVICE_NAME]: 'koko-fe',
    }),
  );

  const traceExporter = new OTLPTraceExporter({
    url: 'https://rnr.kubepia.net/v1/traces',
    // url: 'https://' + import.meta.env.VITE_HOST + '/v1/traces',
    headers: {},
  });

  // const spanProcessor = new BatchSpanProcessor(traceExporter);
  const spanProcessor = new SimpleSpanProcessor(traceExporter);

  const tracerProvider = new WebTracerProvider({
    resource: resource,
    spanProcessors: [spanProcessor],
  });

  tracerProvider.register({
    contextManager: new ZoneContextManager(),
  });

  registerInstrumentations({
    instrumentations: [
      getWebAutoInstrumentations({
        '@opentelemetry/instrumentation-document-load': {
          enabled: false,
        },
        '@opentelemetry/instrumentation-user-interaction': {
          enabled: false,
        },
        '@opentelemetry/instrumentation-fetch': {
          enabled: true,
          propagateTraceHeaderCorsUrls: /.*/,
          clearTimingResources: true,
        },
        '@opentelemetry/instrumentation-xml-http-request': {
          enabled: true,
          applyCustomAttributesOnSpan(span, xhr) {
            const method = (span as any).attributes['http.method']?.toString() || 'UNKNOWN';
            const urlObj = new URL(xhr.responseURL);
            const path = urlObj.pathname;
            span.updateName(`${method} ${path}`);
          },
        },
      }),
    ],
  });
};

export { setupOTelSDK };
