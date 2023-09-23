import PageNav from "../components/PageNav/PageNav";
import styles from "./Product.module.css";
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
  //eslint-disable-next-line
  const [expanded, setExpanded] = useState("");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  return (
    <main className={styles.product}>
      <PageNav />
      <section>
        <div className="row me-0 align-items-center">
          <div className="col-12 col-lg-6 pe-0 mb-4">
            <h2>
              Simple pricing.
              <br />
              Just $5/month.
            </h2>
            <p className={styles.description}>
              As the application grows it is only natural that the great effort
              of our developers should be repaid by the almost insignificant
              amount of only $5 for one month ($60/year).
            </p>
            <p className={styles.description}>In return you get:</p>

            <div>
              <Accordion
                // expanded={expanded === "panel1"}
                onChange={handleChange("panel1")}
              >
                <AccordionSummary
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                >
                  <Typography>Unlimited Expense Tracking</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Remove any limitations on the number of expenses you can
                    track, ensuring you can manage all your financial activities
                    effectively.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion
                // expanded={expanded === "panel2"}
                onChange={handleChange("panel2")}
              >
                <AccordionSummary
                  aria-controls="panel2d-content"
                  id="panel2d-header"
                >
                  <Typography>Priority Customer Support</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Gain access to priority customer support, ensuring that your
                    inquiries and issues are addressed promptly.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion
                // expanded={expanded === "panel3"}
                onChange={handleChange("panel3")}
              >
                <AccordionSummary
                  aria-controls="panel3d-content"
                  id="panel3d-header"
                >
                  <Typography>Enhanced Security</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Get an extra layer of security with advanced encryption and
                    data protection features to keep your financial information
                    safe.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>
          </div>
          <div className="col-12 col-lg-6 pe-0">
            <img
              src="img-2.jpeg"
              alt="money management picture"
              className="img-fluid"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
