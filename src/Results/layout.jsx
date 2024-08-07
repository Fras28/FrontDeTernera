import React, { useState, useEffect } from "react";

import TopNav from "../Landing/logoTop";
import BottomNav from "../Landing/BottomNav";


function Layout({child}) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={styles.container}>
      <TopNav showBackButton={true}/>
      <div style={styles.container2}>
      {child}
      </div>
      <BottomNav />
    </div>
  );
}

export default Layout;

const styles = {
  container: { paddingBottom: "60px" },
  container2: {
    display: "flex",
    flexDirection: "column",
    paddingBottom:"80px",
    overflow:"hidden"

  },
  hero: {
    display: "flex",
    alignItems: "center",
    overflow:"hidden"
  },
};
