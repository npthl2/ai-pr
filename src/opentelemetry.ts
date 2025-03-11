import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { XMLHttpRequestInstrumentation } from '@opentelemetry/instrumentation-xml-http-request';
import { FetchInstrumentation } from '@opentelemetry/instrumentation-fetch';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { trace } from '@opentelemetry/api';


const isLocal = import.meta.env.DEV;

const initializeOpenTelemetry = () => {

    // 트레이스 검증
    const tracer = trace.getTracer('example-tracer');
    const span = tracer.startSpan('example-operation');
    span.end();

    console.log('Tracer 생성 및 Span이 정상적으로 동작합니다.');


    // OTLP Exporter 생성
    const exporter = new OTLPTraceExporter({
        url: 'http://otel-rnr-apps-opentelemetry-collector.otel-collector:4318/v1/traces',
    });

    // TracerProvider 설정
    const provider = new WebTracerProvider();
    provider.addSpanProcessor(
        new BatchSpanProcessor(exporter, {
            maxExportBatchSize: 512,
            maxQueueSize: 2048,
            scheduledDelayMillis: 5000,
            exportTimeoutMillis: 30000,
        })
    );

    // 설정 적용
    provider.register();

    // 추가 인스트루멘테이션 설정
    new XMLHttpRequestInstrumentation();
    new FetchInstrumentation();
};

if (!isLocal) {
    initializeOpenTelemetry();
}
