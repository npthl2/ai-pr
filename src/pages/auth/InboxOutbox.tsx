import { CSSProperties, FC, useEffect, useState } from 'react';
import cttInboxOutboxTraceService from '@api/services/cttInboxOutboxTraceService';
import ccaInboxOutboxTraceService from '@api/services/ccaInboxOutboxTraceService';
import stgInboxOutboxTraceService from '@api/services/stgInboxOutboxTraceService';
import admInboxOutboxTraceService from '@api/services/admInboxOutboxTraceService';

// UTC → 한국시간 변환 함수
const toKoreanTime = (utcString: string | null): string => {
  if (!utcString) return '-';
  const date = new Date(utcString);
  return date.toLocaleString('ko-KR', {
    timeZone: 'Asia/Seoul',
    hour12: false,
  });
};

// 이벤트 데이터 인터페이스 정의
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
  systemName: string;
}

// 공통 카드 스타일
const cardStyle: CSSProperties = {
  border: '1px solid #1976d2',
  borderLeft: '5px solid #1976d2',
  borderRadius: '8px',
  padding: '12px',
  marginBottom: '10px',
  background: '#f5faff',
  boxShadow: '0 2px 8px rgba(25,118,210,0.07)',
};

// 타임라인 스텝 스타일
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

// FlowDiagram 컴포넌트
const FlowDiagram: FC<{
  flowData: EventData[];
  onPopupContentClick: (content: string | null, type: 'message' | 'payload') => void;
}> = ({ flowData, onPopupContentClick }) => {
  const sorted = [...flowData].sort((a, b) => a.trPsSeq - b.trPsSeq);
  const grouped = sorted.reduce<Record<number, EventData[]>>((acc, cur) => {
    (acc[cur.trPsSeq] ||= []).push(cur);
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
                  background: ['READY_TO_PROCESS', 'MESSAGE_CONSUME', 'PROCESS_ERROR'].includes(event.status)
                    ? '#ffebee'
                    : '#f5faff',
                  borderLeft: `5px solid ${
                    ['READY_TO_PROCESS', 'MESSAGE_CONSUME', 'PROCESS_ERROR'].includes(event.status)
                      ? '#d32f2f'
                      : '#1976d2'
                  }`,
                  cursor: event.message || event.payload ? 'pointer' : 'default',
                }}
                onDoubleClick={() => {
                  if (event.payload != null) {
                    onPopupContentClick(event.payload, 'payload');
                  } else if (event.message != null) {
                    onPopupContentClick(event.message, 'message');
                  }
                }}
              >
                <div style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '4px' }}>
                  {event.eventType} ({event.systemName})
                </div>
                <div style={{ fontSize: '13px', color: '#555', marginBottom: '4px' }}>
                  Status: <b>{event.status}</b>
                </div>
                {event.receptionDatetime && (
                  <div style={{ fontSize: '12px' }}>
                    Received: {toKoreanTime(event.receptionDatetime)}
                  </div>
                )}
                {event.processDatetime && (
                  <div style={{ fontSize: '12px' }}>
                    Processed: {toKoreanTime(event.processDatetime)}
                  </div>
                )}
                {event.requestTime && (
                  <div style={{ fontSize: '12px' }}>
                    Requested: {toKoreanTime(event.requestTime)}
                  </div>
                )}
                {event.publishedTime && (
                  <div style={{ fontSize: '12px' }}>
                    Published: {toKoreanTime(event.publishedTime)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// InboxOutbox 컴포넌트
const InboxOutbox: FC = () => {
  const [traceId, setTraceId] = useState('');
  const [flowData, setFlowData] = useState<EventData[]>([]);
  const [recentData, setRecentData] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [popup, setPopup] = useState<{ message: string | null; payload: string | null } | null>(
    null,
  );

  const withSystem = (arr: Omit<EventData, 'systemName'>[], sys: string): EventData[] =>
    arr.map((item) => ({ ...item, systemName: sys }));

  const fetchRecent = async () => {
    try {
      const res = await ccaInboxOutboxTraceService.recentOutbox();
      const data = Array.isArray(res.data) ? withSystem(res.data, 'CCA').slice(0, 100) : [];
      setRecentData(data);
    } catch {
      console.error('최근 조회 실패');
    }
  };

  useEffect(() => {
    fetchRecent();
  }, []);

  const handleSearch = async (id?: string) => {
    const trace = id ?? traceId;
    if (!trace) return;
    setLoading(true);
    setError(null);

    try {
      const [ctt, cca, stg, adm] = await Promise.all([
        cttInboxOutboxTraceService.findInboxOutbox(trace),
        ccaInboxOutboxTraceService.findInboxOutbox(trace),
        stgInboxOutboxTraceService.findInboxOutbox(trace),
        admInboxOutboxTraceService.findInboxOutbox(trace),
      ]);

      const cttData = Array.isArray(ctt.data) ? withSystem(ctt.data, 'CTT') : [];
      const ccaData = Array.isArray(cca.data) ? withSystem(cca.data, 'CCA') : [];
      const stgData = Array.isArray(stg.data) ? withSystem(stg.data, 'STG') : [];
      const admData = Array.isArray(adm.data) ? withSystem(adm.data, 'ADM') : [];

      const all = [...cttData, ...ccaData, ...stgData, ...admData];
      const success = all.filter((evt) => evt.status !== 'FAILED');
      setFlowData(success);
    } catch {
      setError('데이터 로드 실패');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ color: '#1976d2', marginBottom: 16 }}>최신 outbox 조회</h2>

      {recentData.length > 0 && (
        <div
          style={{
            maxHeight: 150,
            overflowY: 'auto',
            marginBottom: 32,
            border: '1px solid #ccc',
            borderRadius: 4,
          }}
        >
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ background: '#f0f4ff' }}>
            <tr>
              {['Request Time', 'Published Time', 'Event Type', 'Trace ID', 'Status'].map(
                (col) => (
                  <th
                    key={col}
                    style={{ padding: 8, border: '1px solid #ccc', textAlign: 'left' }}
                  >
                    {col}
                  </th>
                ),
              )}
            </tr>
            </thead>
            <tbody>
            {recentData.map((evt) => (
              <tr
                key={evt.id}
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  setTraceId(evt.traceId);
                  handleSearch(evt.traceId);
                }}
              >
                <td style={{ padding: 8, border: '1px solid #ccc' }}>
                  {toKoreanTime(evt.requestTime)}
                </td>
                <td style={{ padding: 8, border: '1px solid #ccc' }}>
                  {toKoreanTime(evt.publishedTime)}
                </td>
                <td style={{ padding: 8, border: '1px solid #ccc' }}>{evt.eventType}</td>
                <td style={{ padding: 8, border: '1px solid #ccc' }}>{evt.traceId}</td>
                <td style={{ padding: 8, border: '1px solid #ccc' }}>{evt.status}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      )}

      <h2 style={{ color: '#1976d2', marginBottom: 16 }}>호출 관계도 조회</h2>

      <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
        <input
          type='text'
          placeholder='traceId 입력'
          value={traceId}
          onChange={(e) => setTraceId(e.target.value)}
          style={{ flex: 1, padding: 8, border: '1px solid #ccc', borderRadius: 4 }}
        />
        <button
          onClick={() => handleSearch()}
          style={{
            background: '#1976d2',
            color: 'white',
            border: 'none',
            borderRadius: 4,
            padding: '8px 16px',
            cursor: 'pointer',
          }}
        >
          조회
        </button>
      </div>

      {loading && <p>조회 중...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {flowData.length > 0 && (
        <div style={{ maxHeight: 500, overflowY: 'auto', paddingRight: 10 }}>
          <FlowDiagram
            flowData={flowData}
            onPopupContentClick={(content, type) => {
              setPopup({
                message: type === 'message' ? content : null,
                payload: type === 'payload' ? content : null,
              });
            }}
          />
        </div>
      )}

      {popup && (
        <div
          style={{
            position: 'fixed',
            top: '20%',
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#fff',
            border: '1px solid #ccc',
            borderRadius: 8,
            padding: 20,
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            zIndex: 1000,
            maxWidth: 600,
            maxHeight: '70vh',
            overflowY: 'auto',
          }}
        >
          <h3>📨 메시지 및 📦 페이로드 내용</h3>
          {popup.message && (
            <div>
              <h4>메시지</h4>
              <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{popup.message}</pre>
            </div>
          )}
          {popup.payload && (
            <div>
              <h4>페이로드</h4>
              <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                {(() => {
                  try {
                    const p = JSON.parse(popup.payload!);
                    return JSON.stringify(p, null, 2);
                  } catch {
                    return popup.payload;
                  }
                })()}
              </pre>
            </div>
          )}
          <div style={{ textAlign: 'right', marginTop: 16 }}>
            <button
              onClick={() => setPopup(null)}
              style={{
                padding: '6px 12px',
                background: '#1976d2',
                color: 'white',
                border: 'none',
                borderRadius: 4,
              }}
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InboxOutbox;
