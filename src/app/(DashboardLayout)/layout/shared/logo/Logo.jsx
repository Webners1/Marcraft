import { useSelector } from 'react-redux';
import Link from "next/link";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import typography from '@/utils/theme/Typography';
import { Typography } from '@mui/material';

const Logo = () => {
  const customizer = useSelector((state) => state.customizer);
  const LinkStyled = styled(Link)(() => ({
    height: customizer.TopbarHeight,
    width: customizer.isCollapse ? "40px" : "180px",
    overflow: "hidden",
    display: "flex",
    alignItems: "center"
  }));

  if (customizer.activeDir === "ltr") {
    return (
      <LinkStyled href="/">
        {customizer.activeMode === "dark" ? (
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Image src='/images/logos/logoIcon.svg' alt="icon" width={35} height={35} />
            <Typography variant="h4" color={"white"}>Marcraft</Typography>
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center",  gap: "0.5rem" }}>
            <Image src='/images/logos/logoIcon.svg' alt="icon" width={35} height={35} />
            <Typography variant="h4" color={"white"}>Marcraft</Typography>
          </div>
        )}
      </LinkStyled>
    );
  }

  return (
    <LinkStyled href="/">
      {customizer.activeMode === "dark" ? (
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Image src='/images/logos/logoIcon.svg' alt="icon" width={35} height={35} />
          <Typography variant="h4" color={"white"}>Marcraft</Typography>
        </div>
      ) : (
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Image src='/images/logos/logoIcon.svg' alt="icon" width={35} height={35} />
          <Typography variant="h4" color={"white"}>Marcraft</Typography>
        </div>
      )}
    </LinkStyled>
  );
};

export default Logo;
