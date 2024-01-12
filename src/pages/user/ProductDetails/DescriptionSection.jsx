import SectionHeader from "@/components/user/SectionHeader";

import Typography from "@mui/material/Typography";

const DescriptionSection = ({ description }) => {
  return (
    <>
      <SectionHeader title="description" />
      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        {description}
      </Typography>
    </>
  );
};

export default DescriptionSection;
