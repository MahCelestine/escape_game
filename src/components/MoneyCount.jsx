import "../App.css";

const MoneyCount = ({ items = [] }) => {
  const formatPrice = (val) => "$" + val.toLocaleString("en-US");
  const total = items.reduce((sum, item) => sum + (item.value || 0), 0);

 return (
    <div className="money-count">
      <span className="money-label">Argent total : </span>
      <span className="money-value">{formatPrice(total)}</span>
    </div>
  );
};

export default MoneyCount;
