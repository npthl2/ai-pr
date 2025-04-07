import { useCallback, useState } from 'react';
import { AdditionalService } from '@model/modifyService/ModifyServiceModel';

export type SortDirection = 'asc' | 'desc' | null;
export type SortField = 'serviceName' | 'serviceValue' | null;

export const useAdditionalServiceSorting = () => {
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  // 정렬 핸들러
  const handleSort = useCallback(
    (field: SortField) => {
      if (sortField === field) {
        // 같은 필드를 다시 클릭하면 정렬 방향 토글
        setSortDirection(
          sortDirection === 'asc' ? 'desc' : sortDirection === 'desc' ? null : 'asc',
        );
        if (sortDirection === 'desc') {
          setSortField(null);
        }
      } else {
        // 다른 필드를 클릭하면 해당 필드 오름차순 정렬
        setSortField(field);
        setSortDirection('asc');
      }
    },
    [sortField, sortDirection],
  );

  // 기본 정렬 로직 (최신출시순)
  const defaultSort = useCallback((services: AdditionalService[]) => {
    return [...services].sort((a, b) => {
      if (!a.releaseDate) return -1;
      if (!b.releaseDate) return 1;
      return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
    });
  }, []);

  // 정렬 함수
  const sortAdditionalServices = useCallback((services: AdditionalService[]) => {
    if (!sortField || !sortDirection) {
      return defaultSort(services);
    }

    return [...services].sort((a, b) => {
      if (sortField === 'serviceName') {
        const nameA = a.serviceName.toLowerCase();
        const nameB = b.serviceName.toLowerCase();
        return sortDirection === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
      } else if (sortField === 'serviceValue') {
        return sortDirection === 'asc' ? a.serviceValue - b.serviceValue : b.serviceValue - a.serviceValue;
      }
      return 0;
    });
  }, [sortField, sortDirection, defaultSort]);

  // 정렬 아이콘 생성 함수 - JSX를 반환하지 않고 아이콘 Props를 반환하도록 수정
  const getSortIconProps = useCallback(
    (field: SortField, componentName?: string) => {
      const testId = componentName 
        ? `${componentName}-sort-by-${field === 'serviceName' ? 'name' : 'price'}`
        : `sort-by-${field === 'serviceName' ? 'name' : 'price'}`;
      
      // 기본 스타일
      const baseStyle = {
        verticalAlign: 'middle',
        marginLeft: '4px',
        fontSize: '16px',
      };
      
      // 필드에 따른 스타일과 테스트 ID
      if (sortField !== field) {
        return {
          style: { ...baseStyle, opacity: 0.3 },
          testId: testId,
        };
      }
      
      return {
        style: {
          ...baseStyle,
          transform: sortDirection === 'desc' ? 'rotate(180deg)' : 'none',
        },
        testId: testId,
      };
    },
    [sortField, sortDirection],
  );
  
  return {
    sortField,
    sortDirection,
    handleSort,
    getSortIconProps,
    sortAdditionalServices,
  };
};

export default useAdditionalServiceSorting;
