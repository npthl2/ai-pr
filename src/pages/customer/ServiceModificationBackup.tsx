// import { Box, Typography } from '@mui/material';
// import { useEffect, useState } from 'react';
// import ServiceModify from '@pages/modifyService/modification/ServiceModify';
// import ServiceModificationBlockModal from '@pages/modifyService/modal/ServiceModificationBlockModal';
// import useCustomerStore from '@stores/CustomerStore';
// import {
//   useCheckServiceModifiableQuery,
//   useCustomerCurrentServiceQuery,
// } from '@api/queries/modifyService/useModifyServiceQuery';
// import useModifyServiceStore from '@stores/ModifyServiceStore';
// import { TabInfo } from '@constants/CommonConstant';

// /**
//  * 요금제 변경 화면 컴포넌트
//  *
//  * 기능:
//  * 1. 현재 선택된 고객의 요금제 변경 가능 여부를 확인
//  * 2. 요금제 변경이 불가능한 경우 알림 모달 표시
//  * 3. 요금제와 부가서비스 선택 UI 제공
//  * 4. 요금제 변경 저장 기능
//  *
//  * 워크플로우:
//  * 1. CustomerSearch에서 고객 조회 → CustomerDetail 표시
//  * 2. ServiceInfo의 "요금제/부가서비스 변경" 버튼 클릭 → ServiceModification 화면으로 이동
//  * 3. ServiceModification 화면에서 요금제 변경 가능 여부 확인
//  * 4. 가능하면 요금제 변경 UI 표시, 불가능하면 사유와 함께 모달 표시
//  */
// const ServiceModification = () => {
//   // 모달 상태 관리
//   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
//   const [errorMessage, setErrorMessage] = useState<string>('');
//   const [isChangedToday, setIsModalChangedToday] = useState<boolean>(false);

//   // 요금제 수정 상태 관리 - ModifyServiceStore에서 필요한 함수 가져오기
//   const { setServiceModifiable, setPreviousService, setIsChangedToday } = useModifyServiceStore();

//   // 고객 스토어에서 필요한 정보 가져오기
//   const selectedCustomerId = useCustomerStore((state) => state.selectedCustomerId);
//   const customers = useCustomerStore((state) => state.customers);
//   const isCustomer = useCustomerStore((state) => state.isCustomer);
//   const customerTabs = useCustomerStore((state) => state.customerTabs);

//   // 현재 선택된 고객의 계약 ID 가져오기
//   const selectedCustomer = customers.find((c) => c.id === selectedCustomerId);
//   const contractId =
//     selectedCustomer && isCustomer(selectedCustomer) ? selectedCustomer.contractId : '';

//   /**
//    * 현재 활성화된 탭이 ServiceModification 탭인지 확인
//    *
//    * 이 검사를 통해 CustomerSearch/CustomerDetail 화면에서는
//    * 요금제 변경 관련 API가 호출되지 않도록 합니다.
//    * 즉, ServiceInfo에서 '요금제/부가서비스 변경' 버튼을 클릭하여
//    * ServiceModification 탭으로 이동했을 때만 API가 호출되도록 제어합니다.
//    */
//   const isServiceModificationTabActive = (() => {
//     // 고객 ID가 없거나 해당 고객의 탭 정보가 없으면 false 반환
//     if (!selectedCustomerId || !customerTabs[selectedCustomerId]) return false;

//     // 현재 활성화된 탭 ID 가져오기
//     const activeTabId = customerTabs[selectedCustomerId].activeTab;

//     // 활성화된 탭 객체 찾기
//     const activeTab = customerTabs[selectedCustomerId].tabs.find((tab) => tab.id === activeTabId);

//     // 활성화된 탭이 SERVICE_MODIFICATION 탭인지 확인
//     return activeTab?.id === TabInfo.SERVICE_MODIFICATION.id;
//   })();

//   /**
//    * 요금제 변경 가능 여부 확인 API 호출
//    *
//    * enabled 옵션을 이용해 다음 조건이 모두 충족될 때만 API를 호출합니다:
//    * 1. contractId가 존재함
//    * 2. 현재 활성화된 탭이 ServiceModification 탭임
//    *
//    * 이를 통해 CustomerSearch/CustomerDetail 화면에서는 API가 호출되지 않도록 합니다.
//    */
//   const { data: modifiableData, isLoading } = useCheckServiceModifiableQuery(
//     contractId,
//     !!contractId && isServiceModificationTabActive,
//   );

//   // 현재 고객의 서비스(요금제) 정보 가져오기
//   const { data: currentServiceData } = useCustomerCurrentServiceQuery(contractId);

//   /**
//    * 컴포넌트 마운트 시 요금제 변경 가능 여부와 현재 서비스 정보 설정
//    *
//    * ModifyServiceStore에 요금제 변경 가능 여부와 당일 변경 여부를 저장하고,
//    * 요금제 변경이 불가능한 경우에만 모달을 표시합니다.
//    */
//   useEffect(() => {
//     // 로딩이 완료되고 contractId가 있고 모달 데이터가 있고 ServiceModification 탭이 활성화된 경우에만 처리
//     if (!isLoading && contractId && modifiableData && isServiceModificationTabActive) {
//       // 전역 스토어에 요금제 변경 가능 여부 저장
//       setServiceModifiable(modifiableData.isModifiable);

//       // 요금제 변경이 당일 발생했는지 설정
//       setIsChangedToday(modifiableData.isChangedToday || false);

//       // 요금제 변경이 불가능한 경우에만 모달 표시
//       // 이 조건으로 인해 CustomerSearch/Detail에서는 모달이 표시되지 않습니다
//       if (!modifiableData.isModifiable) {
//         // 모달에 표시할 메시지와 당일 변경 여부 설정
//         setErrorMessage(modifiableData.message || '');
//         setIsModalChangedToday(modifiableData.isChangedToday || false);
//         setIsModalOpen(true);
//       }
//     }
//   }, [
//     isLoading,
//     modifiableData,
//     contractId,
//     setServiceModifiable,
//     setIsChangedToday,
//     isServiceModificationTabActive,
//   ]);

//   /**
//    * 현재 서비스 정보가 있으면 이전 요금제로 설정
//    *
//    * API에서 받아온 서비스 정보를 ModifyServiceStore에 저장합니다.
//    * 이전 요금제로 되돌리기 기능을 위해 필요합니다.
//    */
//   useEffect(() => {
//     // ServiceModification 탭이 활성화된 경우에만 처리
//     if (
//       currentServiceData &&
//       currentServiceData.previousService &&
//       isServiceModificationTabActive
//     ) {
//       setPreviousService(currentServiceData.previousService);
//     }
//   }, [currentServiceData, setPreviousService, isServiceModificationTabActive]);

//   // 모달 닫기 핸들러
//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };

//   return (
//     <Box>
//       {/* 1. 헤더 정보 영역 */}
//       <Box
//         sx={{
//           borderRadius: '8px',
//           padding: '20px',
//         }}
//       >
//         {/* TODO: CustomerInfoHeader 컴포넌트 
//           - 회원 기본 정보 표시
//           - 서비스번호, 번호 신택, 요금제, 기기정보 등
//         */}
//         <Typography>회원 기본 정보 표시</Typography>
//       </Box>

//       {/* 2. 현재/변경 요금제 비교 영역 */}
//       <Box
//         display='full'
//         borderRadius='8px'
//         sx={{
//           padding: '20px',
//         }}
//       >
//         <Box
//           display='flex'
//           borderRadius='8px'
//           border='1px solid #e0e0e0'
//           sx={{
//             padding: '20px',
//           }}
//         >
//           {/* 2-1. 왼쪽: 현재 요금제 정보 */}
//           <Box
//             flex={1}
//             sx={{
//               borderTopLeftRadius: '8px',
//               borderBottomLeftRadius: '8px',
//               padding: '20px',
//             }}
//           >
//             {/* TODO: CurrentServiceInfo 컴포넌트 
//             - 현재 요금제명과 금액
//             - 현재 부가서비스 목록
//             - 합계 금액
//           */}
//             <Typography>현재 요금제 정보</Typography>
//           </Box>

//           {/* 2-2. 오른쪽: 변경할 요금제 정보 */}
//           <ServiceModify />
//         </Box>
//       </Box>

//       {/* 요금제 변경 불가 알림 모달 */}
//       <ServiceModificationBlockModal
//         open={isModalOpen}
//         message={errorMessage}
//         isChangedToday={isChangedToday}
//         onClose={handleCloseModal}
//       />
//     </Box>
//   );
// };

// export default ServiceModification;
