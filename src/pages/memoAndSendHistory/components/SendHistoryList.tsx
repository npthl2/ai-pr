import { Box, Typography, TableHead } from '@mui/material';
import TableCell from '@components/Table/TableCell';
import TableRow from '@components/Table/TableRow';
import TableBody from '@components/Table/TableBody';
import { useSendHistoryQuery } from '@api/queries/sendHistory/useSendHistoryQuery';
import Checkbox from '@components/Checkbox';
import Tooltip from '@components/Tooltip';
import {
  SendHistoryBox,
  SendHistoryTableContainer,
  SendHistoryTable,
  StyledAscIcon,
  HeaderCellWrapper,
  SortIconButton,
  ToggleContainer,
  StyledSwitch,
  HeaderWrapper,
  CheckboxContainer,
  FilterContainer,
  StyledTablePagination,
} from './SendHistoryList.styled';
import { useState, useEffect, useMemo } from 'react';
import useCustomerStore from '@stores/CustomerStore';
import { MessageType, SendHistory } from '@model/SendHistory';

type SortOrder = 'asc' | 'desc' | null;
type SortField = 'messageType' | 'requestTime' | 'sendTime' | 'successYn';
const DEFAULT_ROWS_PER_PAGE = 8;

const SendHistoryList = () => {
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);
  const [showSuccessOnly, setShowSuccessOnly] = useState(false);
  const [smsChecked, setSmsChecked] = useState(true);
  const [emailChecked, setEmailChecked] = useState(true);
  const customerId = useCustomerStore((state) => state.selectedCustomerId) || '';

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder((prev) => {
        if (prev === 'asc') return 'desc';
        if (prev === 'desc') return null;
        return 'asc';
      });
      if (sortOrder === 'desc') {
        setSortField(null);
      }
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const getSortIconStyle = (field: SortField) => {
    if (sortField !== field) return { opacity: 0.3 };
    if (sortOrder === null) return { opacity: 0.3 };
    return { transform: sortOrder === 'asc' ? 'rotate(180deg)' : 'none' };
  };

  const columns = [
    {
      key: 'messageType',
      label: '구분',
      render: (item: SendHistory) => <Typography>{item.messageType}</Typography>,
    },
    {
      key: 'requestTime',
      label: '요청일시',
      render: (item: SendHistory) => <Typography>{item.requestTime}</Typography>,
    },
    {
      key: 'sendTime',
      label: '발송일시',
      render: (item: SendHistory) => <Typography>{item.sentTime}</Typography>,
    },
    {
      key: 'message',
      label: '메시지',
      render: (item: SendHistory) => (
        <Tooltip sx={{ zIndex: 10000 }} title={item.message} placement='bottom' arrow>
          <Box sx={{ maxWidth: '100%' }}>
            <Typography
              sx={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {item.message}
            </Typography>
          </Box>
        </Tooltip>
      ),
    },
    {
      key: 'successYn',
      label: '성공여부',
      render: (item: SendHistory) => <Typography>{item.successYn}</Typography>,
    },
  ];

  const getMessageType = () => {
    if (smsChecked && emailChecked) return MessageType.BOTH;
    if (smsChecked) return MessageType.SMS;
    if (emailChecked) return MessageType.EMAIL;
    return MessageType.BOTH;
  };

  const { data: sendHistoryResponse } = useSendHistoryQuery(
    customerId,
    getMessageType(),
    showSuccessOnly ? 'Y' : 'N',
    page + 1,
    rowsPerPage,
  );

  const sortedData = useMemo(() => {
    if (!sendHistoryResponse?.content) {
      return [];
    }

    let histories = [...(sendHistoryResponse.content as SendHistory[])];

    if (sortField && sortOrder) {
      histories.sort((a, b) => {
        let compareA: string;
        let compareB: string;

        switch (sortField) {
          case 'messageType':
            compareA = a.messageType;
            compareB = b.messageType;
            break;
          case 'requestTime':
            compareA = a.requestTime;
            compareB = b.requestTime;
            break;
          case 'sendTime':
            compareA = a.sentTime;
            compareB = b.sentTime;
            break;
          case 'successYn':
            compareA = a.successYn;
            compareB = b.successYn;
            break;
          default:
            return 0;
        }

        const result = compareA.localeCompare(compareB);
        return sortOrder === 'asc' ? result : -result;
      });
    }

    return histories;
  }, [sendHistoryResponse?.content, sortField, sortOrder]);

  useEffect(() => {
    setPage(0);
  }, [smsChecked, emailChecked, rowsPerPage, showSuccessOnly]);

  return (
    <SendHistoryBox>
      <Box>
        <HeaderWrapper>
          <Typography variant='h3' sx={{ marginRight: '36px' }}>
            발송이력
          </Typography>
          <FilterContainer>
            <CheckboxContainer>
              <Checkbox
                checked={smsChecked}
                onChange={(checked) => {
                  setSmsChecked(checked);
                  if (!checked && !emailChecked) {
                    setSmsChecked(true);
                  }
                }}
                label='SMS'
                data-testid='send-history-list-sms-checkbox'
              />
              <Checkbox
                checked={emailChecked}
                onChange={(checked) => {
                  setEmailChecked(checked);
                  if (!checked && !smsChecked) {
                    setEmailChecked(true);
                  }
                }}
                label='E-Mail'
                data-testid='send-history-list-email-checkbox'
              />
            </CheckboxContainer>
            <ToggleContainer>
              <StyledSwitch
                checked={showSuccessOnly}
                onChange={(e) => setShowSuccessOnly(e.target.checked)}
                data-testid='send-history-list-success-only-switch'
              />
              <Typography>성공 건만 보기</Typography>
            </ToggleContainer>
          </FilterContainer>
        </HeaderWrapper>

        <SendHistoryTableContainer>
          <SendHistoryTable>
            <TableHead style={{ position: 'sticky', top: 0 }}>
              <TableRow variant='head'>
                {columns.map((column) => (
                  <TableCell
                    key={column.key}
                    sx={{
                      width:
                        column.key === 'messageType'
                          ? '85px'
                          : column.key === 'requestTime' || column.key === 'sendTime'
                            ? '180px'
                            : column.key === 'successYn'
                              ? '110px'
                              : 'auto',
                    }}
                  >
                    <HeaderCellWrapper>
                      <Typography>{column.label}</Typography>
                      {column.key !== 'message' && (
                        <SortIconButton
                          onClick={() => handleSort(column.key as SortField)}
                          data-testid={`send-history-list-sort-icon-${column.key}`}
                        >
                          <StyledAscIcon style={getSortIconStyle(column.key as SortField)} />
                        </SortIconButton>
                      )}
                    </HeaderCellWrapper>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody<SendHistory>
              content={sortedData}
              columns={columns}
              emptyMessage='발송이력이 없습니다.'
              data-testid='send-history-list-table-body'
            />
          </SendHistoryTable>
        </SendHistoryTableContainer>
        <StyledTablePagination
          rowsPerPageOptions={[0, DEFAULT_ROWS_PER_PAGE]}
          page={page}
          count={sendHistoryResponse?.totalCount || 0}
          rowsPerPage={rowsPerPage}
          onPageChange={(__, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value));
            setPage(0);
          }}
          data-testid='send-history-list-pagination'
        />
      </Box>
    </SendHistoryBox>
  );
};

export default SendHistoryList;
