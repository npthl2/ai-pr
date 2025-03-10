import { Typography, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState, useRef } from 'react';
import {
  Container,
  ContentWrapper,
  SectionsContainer,
  SectionsWrapper,
  StyledAccordion,
} from './NewContract.styled';
import CustomerSection from './sections/CustomerSection';

import SalesSection from './sections/SalesSection';
import ContractSection from './sections/ContractSection';
import DeviceSection from './sections/DeviceSection';
import { SectionId, SECTION_IDS, SECTION_TITLES } from '@constants/RegistrationConstants';
import ContractRequest from './ContractRequest';
import ContractSummary from './sections/ContractSummary';
import InvoiceSection from './sections/InvoiceSection';

interface NewContractProps {
  contractTabId: string;
}

const NewContract = ({ contractTabId }: NewContractProps) => {
  const [isSaveRequested, setIsSaveRequested] = useState(false);
  const [expanded, setExpanded] = useState<SectionId>(SECTION_IDS.CUSTOMER);
  const [completedSections, setCompletedSections] = useState<SectionId[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const sections = [
    {
      id: SECTION_IDS.CUSTOMER,
      title: SECTION_TITLES[SECTION_IDS.CUSTOMER],
      component: () => (
        // TODO : 자신의 부분만 수정하고 나머지 부분 수정 시 공유할 것. 예시 코드 참고
        <CustomerSection
          contractTabId={contractTabId}
          onComplete={() => handleSectionComplete(SECTION_IDS.CUSTOMER)}
          completed={completedSections.includes(SECTION_IDS.CUSTOMER)}
        />
      ),
      canExpand: () => true,
    },
    {
      id: SECTION_IDS.INVOICE,
      title: SECTION_TITLES[SECTION_IDS.INVOICE],
      component: () => (
        // TODO : 자신의 부분만 수정하고 나머지 부분 수정 시 공유할 것. 예시 코드 참고
        <InvoiceSection
          contractTabId={contractTabId}
          onComplete={() => handleSectionComplete(SECTION_IDS.INVOICE)}
          completed={completedSections.includes(SECTION_IDS.INVOICE)}
        />
      ),
      canExpand: (completedSections: SectionId[]) =>
        completedSections.includes(SECTION_IDS.CUSTOMER),
    },
    {
      id: SECTION_IDS.SALES,
      title: SECTION_TITLES[SECTION_IDS.SALES],
      component: () => (
        // TODO : 자신의 부분만 수정하고 나머지 부분 수정 시 공유할 것. 예시 코드 참고
        <SalesSection
          contractTabId={contractTabId}
          onComplete={() => handleSectionComplete(SECTION_IDS.SALES)}
          completed={completedSections.includes(SECTION_IDS.SALES)}
        />
      ),
      canExpand: (completedSections: SectionId[]) =>
        completedSections.includes(SECTION_IDS.CUSTOMER) &&
        completedSections.includes(SECTION_IDS.INVOICE),
    },
    {
      id: SECTION_IDS.CONTRACT,
      title: SECTION_TITLES[SECTION_IDS.CONTRACT],
      component: () => (
        // TODO : 자신의 부분만 수정하고 나머지 부분 수정 시 공유할 것. 예시 코드 참고
        <ContractSection
          contractTabId={contractTabId}
          onComplete={() => handleSectionComplete(SECTION_IDS.CONTRACT)}
          completed={completedSections.includes(SECTION_IDS.CONTRACT)}
        />
      ),
      canExpand: (completedSections: SectionId[]) =>
        completedSections.includes(SECTION_IDS.CUSTOMER) &&
        completedSections.includes(SECTION_IDS.INVOICE) &&
        completedSections.includes(SECTION_IDS.SALES),
    },
    {
      id: SECTION_IDS.DEVICE,
      title: SECTION_TITLES[SECTION_IDS.DEVICE],
      component: () => (
        // TODO : 자신의 부분만 수정하고 나머지 부분 수정 시 공유할 것. 예시 코드 참고
        <DeviceSection
          contractTabId={contractTabId}
          onComplete={() => handleSectionComplete(SECTION_IDS.DEVICE)}
          completed={completedSections.includes(SECTION_IDS.DEVICE)}
        />
      ),
      canExpand: (completedSections: SectionId[]) =>
        completedSections.includes(SECTION_IDS.CUSTOMER) &&
        completedSections.includes(SECTION_IDS.INVOICE) &&
        completedSections.includes(SECTION_IDS.SALES) &&
        completedSections.includes(SECTION_IDS.CONTRACT),
    },
  ];

  const handleSectionComplete = (sectionId: SectionId) => {
    setCompletedSections((prev) => [...prev, sectionId]);
    const currentIndex = sections.findIndex((section) => section.id === sectionId);

    if (currentIndex < sections.length - 1) {
      const nextSection = sections[currentIndex + 1];
      setExpanded(nextSection.id);

      setTimeout(() => {
        const sectionElement = document.getElementById(
          `${contractTabId}-section-${nextSection.id}`,
        );
        if (sectionElement && wrapperRef.current) {
          const previousSections = sections.slice(0, currentIndex + 1);
          const totalPreviousHeight = previousSections.reduce((height, section) => {
            const el = document.getElementById(`${contractTabId}-section-${section.id}`);
            return height + (el?.offsetHeight || 0);
          }, 0);

          wrapperRef.current.scrollTo({
            top: totalPreviousHeight,
            behavior: 'smooth',
          });
        }
      }, 100);
    }
  };

  const handleChange = (panel: SectionId) => (_: React.SyntheticEvent, isExpanded: boolean) => {
    const sectionIndex = sections.findIndex((section) => section.id === panel);
    const previousSectionsCompleted = sections
      .slice(0, sectionIndex)
      .every((section) => completedSections.includes(section.id));

    if (previousSectionsCompleted) {
      setExpanded(isExpanded ? panel : SECTION_IDS.CUSTOMER);
    }
  };

  const isExpanded = (sectionId: SectionId, canExpand: boolean) => {
    return completedSections.includes(sectionId) || (expanded === sectionId && canExpand);
  };

  return isSaveRequested ? (
    <ContractRequest contractTabId={contractTabId} />
  ) : (
    <Container>
      <ContentWrapper>
        <SectionsContainer>
          <SectionsWrapper ref={wrapperRef}>
            {sections.map((section) => {
              const SectionComponent = section.component;
              const canExpand = section.canExpand(completedSections);

              return (
                <StyledAccordion
                  key={`${contractTabId}-${section.id}`}
                  id={`${contractTabId}-section-${section.id}`}
                  data-testid={`${contractTabId}-section-${section.id}`}
                  expanded={isExpanded(section.id, canExpand)}
                  onChange={handleChange(section.id)}
                  disableGutters
                  elevation={0}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    data-testid={`${contractTabId}-section-${section.id}-summary`}
                    sx={{
                      pointerEvents: completedSections.includes(section.id) ? 'none' : 'auto',
                    }}
                  >
                    <Typography
                      variant='h3'
                      data-testid={`${contractTabId}-section-${section.id}-title`}
                    >
                      {section.title}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails
                    sx={{ p: 3 }}
                    data-testid={`${contractTabId}-section-${section.id}-details`}
                  >
                    <SectionComponent />
                  </AccordionDetails>
                </StyledAccordion>
              );
            })}
          </SectionsWrapper>
        </SectionsContainer>
        <ContractSummary contractTabId={contractTabId} setIsSaveRequested={setIsSaveRequested} />
      </ContentWrapper>
    </Container>
  );
};

export default NewContract;
