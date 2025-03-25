import React, { useState } from 'react';
import { Typography } from '@mui/material';
import Unmasking from '@pages/unmasking/Unmasking';
import { useQueryClient } from '@tanstack/react-query';
import { CustomerContract } from '@model/CustomerContract';
import { produce } from 'immer';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { MaskedTarget } from './types';
import useMemberStore from '@stores/MemberStore';
import { MASKING_ITEM_CODE } from '@constants/CommonConstant';

interface MaskingInfoProps {
  originalInfo: string;
  encryptedInfo: string;
  maskingParam: MaskedTarget;
}

const MaskingInfo: React.FC<MaskingInfoProps> = ({ originalInfo, encryptedInfo, maskingParam }) => {
  const queryClient = useQueryClient();
  const [isUnmaskPopupOpen, setIsUnmaskPopupOpen] = useState(false);

  const memberInfo = useMemberStore((state) => state.memberInfo);
  const isUnmaskable = memberInfo?.authorities.includes('ROLE_UNMASKING');

  // context menu 관련 핸들러
  const [contextMenu, setContextMenu] = React.useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
          }
        : null,
    );
  };

  const handleMaskingOpen = () => {
    setIsUnmaskPopupOpen(true);
    handleClose();
  };

  const handleClose = () => {
    setContextMenu(null);
  };

  // 마스킹 해제 된 데이터 업데이트

  const updateMaskingValue = (unmaskedItem: string, param: MaskedTarget) => {
    queryClient.setQueryData<CustomerContract>(
      ['customerContracts', param.customerId],
      (oldData) => {
        return produce(oldData, (draft) => {
          const found = draft?.contracts.find((contract) => {
            return contract.contractId === param.contractId;
          });
          if (found) {
            switch (param.maskingType) {
              case 'paymentName':
                found.invoiceDetail.paymentName = unmaskedItem;
                break;
              case 'recipient':
                found.invoiceDetail.recipient = unmaskedItem;
                break;
              case 'account':
                found.invoiceDetail.account = unmaskedItem;
                break;
              case 'card':
                found.invoiceDetail.card = unmaskedItem;
                break;
              case 'invoiceNumber':
                found.invoiceDetail.invoiceNumber = unmaskedItem;
                break;
              case 'invoiceAddress':
                found.invoiceDetail.invoiceAddress = unmaskedItem;
                break;
              case 'deviceSerialNumber':
                found.contractDetail.device.deviceSerialNumber = unmaskedItem;
                break;
              case 'simSerialNumber':
                found.contractDetail.device.simSerialNumber = unmaskedItem;
                break;
              default:
                break;
            }
          }
        });
      },
    );
  };

  const maskingItemCodeSelector = (maskingTarget: MaskedTarget) => {
    const maskingType = maskingTarget.maskingType;
    switch (maskingType) {
      case 'paymentName':
        return MASKING_ITEM_CODE.CUSTOMER_NAME;
      case 'recipient':
        return MASKING_ITEM_CODE.CUSTOMER_NAME;
      case 'account':
        return MASKING_ITEM_CODE.CUSTOMER_ACCOUNTNUMBER;
      case 'card':
        return MASKING_ITEM_CODE.CUSTOMER_CREDITCARDNUMBER;
      case 'invoiceNumber':
        return MASKING_ITEM_CODE.CUSTOMER_EMAIL;
      case 'invoiceAddress':
        return MASKING_ITEM_CODE.CUSTOMER_ALLMASKINGINFO;
      case 'deviceSerialNumber':
        return MASKING_ITEM_CODE.CUSTOMER_ALLMASKINGINFO;
      case 'simSerialNumber':
        return MASKING_ITEM_CODE.CUSTOMER_ALLMASKINGINFO;
      default:
        return MASKING_ITEM_CODE.CUSTOMER_ALLMASKINGINFO;
    }
  };

  return (
    <div
      onContextMenu={(event) => {
        if (isUnmaskable) {
          handleContextMenu(event);
        } else {
          event.preventDefault();
        }
      }}
      style={{ cursor: isUnmaskable ? 'context-menu' : 'default' }}
    >
      <Typography variant='body2' sx={{ cursor: 'pointer' }}>
        {originalInfo}
      </Typography>
      {isUnmaskPopupOpen && (
        <Unmasking
          onClose={() => setIsUnmaskPopupOpen(false)}
          onUnmask={updateMaskingValue}
          requestData={{
            itemTypeCode: maskingItemCodeSelector(maskingParam),
            encryptedItem: encryptedInfo,
            param: maskingParam,
          }}
          data-testid='unmasking-popup'
        />
      )}
      <Menu
        open={contextMenu !== null}
        onClose={handleClose}
        anchorReference='anchorPosition'
        anchorPosition={
          contextMenu !== null ? { top: contextMenu.mouseY, left: contextMenu.mouseX } : undefined
        }
        sx={{
          '& .MuiMenu-list': {
            padding: 0,
          },
        }}
      >
        <MenuItem
          onClick={handleMaskingOpen}
          data-testid="unmasking-menu-item"
          sx={{
            width: '206px',
            height: '33px',
            padding: '6px 16px',
            borderRadius: '4px',
            background: '#EBF0F5',
            boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
          }}
        >
          마스킹 해제
        </MenuItem>
      </Menu>
    </div>
  );
};

export default MaskingInfo;
