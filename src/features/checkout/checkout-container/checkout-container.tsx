import s from "./checkout-container.module.css";

interface Props {
  mainArea: React.ReactNode;
  summaryArea: React.ReactNode;
}
export default function CheckoutContainer({mainArea, summaryArea}: Props) {
  return (
    <div className={s.container}>
      <div className={s.main}>
        {mainArea}
      </div>
      <div className={s.summary}>
        {summaryArea}
      </div>
    </div>
  );
}
