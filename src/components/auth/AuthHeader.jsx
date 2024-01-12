import Logo from "../user/Logo";

import { Typography } from "@mui/material";

import authTheme from "@/theme/authTheme";

function AuthHeader({ title, description, logo = true }) {
  return (
    <section className="auth-header">
      {logo && <Logo />}
      <article>
        <Typography variant="h5" sx={authTheme.authHeaderTitle}>
          {title}
        </Typography>
        <Typography variant="body2" sx={authTheme.authHeaderText}>
          {description}
        </Typography>
      </article>
    </section>
  );
}

export default AuthHeader;
