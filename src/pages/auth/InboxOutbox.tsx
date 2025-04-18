import { CSSProperties, FC, useState } from 'react';
import cttInboxOutboxTraceService from '@api/services/cttInboxOutboxTraceService';
import ccaInboxOutboxTraceService from '@api/services/ccaInboxOutboxTraceService';

interface EventData {
  eventType: string;
  traceId: string;
  id: number;
  status: string;
  receptionDatetime: string | null;
  processDatetime: string | null;
  requestTime: string | null;
  publishedTime: string | null;
  trPsSeq: number;
  message: string | null;
  payload: string | null;
}

interface FlowDiagramProps {
  flowData: EventData[];
}
const cardStyle: CSSProperties = {
  border: '1px solid #1976d2',
  borderLeft: '5px solid #1976d2',
  borderRadius: '8px',
  padding: '12px',
  marginBottom: '10px',
  background: '#f5faff',
  boxShadow: '0 2px 8px rgba(25,118,210,0.07)',
};

const stepStyle: CSSProperties = {
  marginBottom: '32px',
  position: 'relative',
  paddingLeft: '80px',
};

const markerStyle: CSSProperties = {
  position: 'absolute',
  left: '0',
  top: '0',
  width: '70px',
  textAlign: 'center',
  fontWeight: 'bold',
  color: '#1976d2',
};

const timelineStyle: CSSProperties = {
  position: 'absolute',
  left: '35px',
  top: '0',
  width: '2px',
  height: '100%',
  background: '#b3c6e2',
};

const FlowDiagram: FC<FlowDiagramProps> = ({ flowData }) => {
  const sortedData = [...flowData].sort((a, b) => a.trPsSeq - b.trPsSeq);
  const grouped = sortedData.reduce<Record<number, EventData[]>>((acc, cur) => {
    const key = cur.trPsSeq;
    acc[key] = acc[key] || [];
    acc[key].push(cur);
    return acc;
  }, {});

  return (
    <div style={{ position: 'relative', padding: '40px' }}>
      <div style={timelineStyle}></div>
      {Object.entries(grouped).map(([seq, events]) => (
        <div key={seq} style={stepStyle}>
          <div style={markerStyle}>Step {seq}</div>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            {events.map((event) => (
              <div
                key={event.id}
                style={{
                  ...cardStyle,
                  background: event.status === 'MESSAGE_CONSUME' ? '#ffebee' : '#f5faff',
                  borderLeft: `5px solid ${event.status === 'MESSAGE_CONSUME' ? '#d32f2f' : '#1976d2'}`,
                }}
              >
                <div style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '4px' }}>
                  {event.eventType}
                </div>
                <div style={{ fontSize: '13px', color: '#555', marginBottom: '2px' }}>
                  Status: <b>{event.status}</b>
                </div>
                {event.receptionDatetime && (
                  <div style={{ fontSize: '12px' }}>Received: {event.receptionDatetime}</div>
                )}
                {event.processDatetime && (
                  <div style={{ fontSize: '12px' }}>Processed: {event.processDatetime}</div>
                )}
                {event.requestTime && (
                  <div style={{ fontSize: '12px' }}>Requested: {event.requestTime}</div>
                )}
                {event.publishedTime && (
                  <div style={{ fontSize: '12px' }}>Published: {event.publishedTime}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const InboxOutbox: FC = () => {
  const [traceId, setTraceId] = useState('');
  const [flowData, setFlowData] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!traceId) return;

    setLoading(true);
    setError(null);

    try {
      const [cttResponse, ccaResponse] = await Promise.all([
        cttInboxOutboxTraceService.findInboxOutbox(traceId),
        ccaInboxOutboxTraceService.findInboxOutbox(traceId),
      ]);

      const cttData: EventData[] = Array.isArray(cttResponse.data) ? cttResponse.data : [];
      const ccaData: EventData[] = Array.isArray(ccaResponse.data) ? ccaResponse.data : [];

      // Merge and deduplicate based on 'id'
      const mergedDataMap = new Map<number, EventData>();
      [...cttData, ...ccaData].forEach((item) => {
        mergedDataMap.set(item.id, item);
      });

      const mergedData = Array.from(mergedDataMap.values());

      // Sort by 'trPsSeq'
      mergedData.sort((a, b) => a.trPsSeq - b.trPsSeq);

      setFlowData(mergedData);
    } catch (err) {
      console.error('조회 실패:', err);
      setError('데이터를 불러오는 데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ color: '#1976d2', marginBottom: '16px' }}>호출 관계도 조회</h2>

      <div style={{ marginBottom: '16px', display: 'flex', gap: '10px' }}>
        <input
          type='text'
          value={traceId}
          onChange={(e) => setTraceId(e.target.value)}
          placeholder='traceId 입력'
          style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', flex: 1 }}
        />
        <button
          onClick={handleSearch}
          style={{
            background: '#1976d2',
            color: '#fff',
            padding: '8px 16px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          조회
        </button>
      </div>

      {loading && <p>조회 중입니다...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {flowData.length > 0 && <FlowDiagram flowData={flowData} />}
    </div>
  );
};

export default InboxOutbox;
