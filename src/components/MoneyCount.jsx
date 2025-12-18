import React from "react";

const MoneyCount = ({ items = [] }) => {
  const formatPrice = (val) => "$" + val.toLocaleString("en-US");
  const total = items.reduce((sum, item) => sum + (item.value || 0), 0);

  return (
    <div
      style={{
        backgroundColor: "rgba(18, 25, 40, 0.75)",
        border: "1px solid rgba(148, 163, 184, 0.3)",
        borderRadius: "8px",
        padding: "10px 20px",
        boxShadow: "0 4px 6px rgba(0,0,0,0.5)",
        minWidth: "120px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          fontSize: "10px",
          color: "#94a3b8",
          textTransform: "uppercase",
          letterSpacing: "1px",
        }}
      >
        Butin
      </div>
      <p
        style={{
          margin: 0,
          fontFamily: "monospace",
          fontSize: "24px",
          color: "#fbbf24",
          fontWeight: "bold",
          textShadow: "0 0 5px rgba(251, 191, 36, 0.3)",
        }}
      >
        {formatPrice(total)}
      </p>
    </div>
  );
};

export default MoneyCount;
