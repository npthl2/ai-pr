import { Breadcrumbs as MuiBreadcrumbs, Typography } from '@mui/material';

interface BreadcrumbProps {
  activeTabLabel?: string[];
}

const Breadcrumb = ({ activeTabLabel }: BreadcrumbProps) => {
  return (
    activeTabLabel && (
      <MuiBreadcrumbs separator={'/'} aria-label='breadcrumb'>
        {activeTabLabel.map((label, index) => (
          <Typography key={index} variant='body2' color='text.secondary'>
            {label}
          </Typography>
        ))}
      </MuiBreadcrumbs>
    )
  );
};

export default Breadcrumb;
