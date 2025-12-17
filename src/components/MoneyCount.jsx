import "../App.css";

const MoneyCount = ({ items = [] }) => {
  const formatPrice = (val) => "$" + val.toLocaleString("en-US");
  const total = items.reduce((sum, item) => sum + (item.value || 0), 0);

  return (
    <div
      style={{
        backgroundColor: "rgba(0,0,0,0.6)",
        padding: "1%",
        borderRadius: "5px",
        fontFamily: "Calibri",
      }}
    >
      <p>{formatPrice(total)}</p>
    </div>
  );
};

export default MoneyCount;
