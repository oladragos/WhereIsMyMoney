import PageNav from "../components/PageNav/PageNav";
import styles from "./Pricing.module.css";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { useState } from "react";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function Pricing() {
  const [expanded, setExpanded] = useState("");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <main className={styles.pricing}>
      <PageNav />
      <section>
        <div className="d-flex align-items-center row me-0">
          <div className="d-flex justify-content-start">
            <h2>
              Simple pricing.
              <br />
              Just $5/month.
            </h2>
          </div>

          <div className="col-12 col-lg-6 pe-0 mb-4">
            <p className={styles.description}>
              As the application grows it is only natural that the great effort
              of our developers should be repaid by the almost insignificant
              amount of only $5 for one month ($60/year).
            </p>
            <p className={styles.description}>In return you get:</p>

            <div style={{ width: "95%" }}>
              <Accordion
                expanded={expanded === "panel1"}
                onChange={handleChange("panel1")}
                sx={{ backgroundColor: "var(--color-light--3)" }}
              >
                <AccordionSummary
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                >
                  <Typography>Unlimited Expense Tracking</Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{ backgroundColor: "var(--color-light--2)" }}
                >
                  <Typography>
                    Remove any limitations on the number of expenses you can
                    track, ensuring you can manage all your financial activities
                    effectively.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expanded === "panel2"}
                onChange={handleChange("panel2")}
                sx={{ backgroundColor: "var(--color-light--3)" }}
              >
                <AccordionSummary
                  aria-controls="panel2d-content"
                  id="panel2d-header"
                >
                  <Typography>Priority Customer Support</Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{ backgroundColor: "var(--color-light--2)" }}
                >
                  <Typography>
                    Gain access to priority customer support, ensuring that your
                    inquiries and issues are addressed promptly.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expanded === "panel3"}
                onChange={handleChange("panel3")}
                sx={{ backgroundColor: "var(--color-light--3)" }}
              >
                <AccordionSummary
                  aria-controls="panel3d-content"
                  id="panel3d-header"
                >
                  <Typography>Enhanced Security</Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{ backgroundColor: "var(--color-light--2)" }}
                >
                  <Typography>
                    Get an extra layer of security with advanced encryption and
                    data protection features to keep your financial information
                    safe.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>
          </div>

          <div className="col-12 col-lg-6 pe-0 mb-4 d-flex justify-content-center">
            <img
              src="img-2.jpg"
              alt="money-growth-picture"
              className="img-fluid"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
