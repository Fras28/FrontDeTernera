import React from "react";
import Logo from "../assets/LogoDeTernera.png";
import { border, Button, Image, Img } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const TopNav = () => {
  const carrito = (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 20C5.45 20 4.97917 19.8042 4.5875 19.4125C4.19583 19.0208 4 18.55 4 18C4 17.45 4.19583 16.9792 4.5875 16.5875C4.97917 16.1958 5.45 16 6 16C6.55 16 7.02083 16.1958 7.4125 16.5875C7.80417 16.9792 8 17.45 8 18C8 18.55 7.80417 19.0208 7.4125 19.4125C7.02083 19.8042 6.55 20 6 20ZM16 20C15.45 20 14.9792 19.8042 14.5875 19.4125C14.1958 19.0208 14 18.55 14 18C14 17.45 14.1958 16.9792 14.5875 16.5875C14.9792 16.1958 15.45 16 16 16C16.55 16 17.0208 16.1958 17.4125 16.5875C17.8042 16.9792 18 17.45 18 18C18 18.55 17.8042 19.0208 17.4125 19.4125C17.0208 19.8042 16.55 20 16 20ZM5.15 4L7.55 9H14.55L17.3 4H5.15ZM4.2 2H18.95C19.3333 2 19.625 2.17083 19.825 2.5125C20.025 2.85417 20.0333 3.2 19.85 3.55L16.3 9.95C16.1167 10.2833 15.8708 10.5417 15.5625 10.725C15.2542 10.9083 14.9167 11 14.55 11H7.1L6 13H18V15H6C5.25 15 4.68333 14.6708 4.3 14.0125C3.91667 13.3542 3.9 12.7 4.25 12.05L5.6 9.6L2 2H0V0H3.25L4.2 2Z" fill="#1C1B1F"/>
    </svg> )

    const Logo = (<svg  height="60" viewBox="0 0 74 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M26.7876 14.5899C26.9903 15.9018 16.3984 20.6025 11.0771 22.7889C14.4219 18.8534 21.8464 15.6831 25.1405 14.5899C20.8835 13.8836 18.9746 8.82966 18.5523 6.39101C23.7215 4.17101 31.1797 6.64328 34.2627 8.15692C38.0636 4.62507 48.5794 -1.17726 49.2129 0.210254C49.8464 1.59777 47.1857 9.54445 43.7649 10.049C44.9052 10.6797 49.3396 13.9593 56.0545 23.2934C51.6201 20.6446 45.3275 13.4547 42.8781 9.92285C46.4256 8.28306 46.9324 2.60683 47.1857 1.97614C47.4391 1.34545 35.2762 8.66147 34.6428 9.16602C34.0093 9.67057 21.2129 4.87734 20.9595 7.90465C20.7061 10.9319 26.5342 12.9502 26.7876 14.5899Z" fill="#59452C"/>
      <path d="M41.8645 63.9995C39.8373 64.1004 23.4512 48.905 15.5115 41.2947C19.5658 42.4047 34.6005 55.7165 41.6111 62.2336C40.9776 61.2245 43.5115 46.5925 44.145 45.205C44.7785 43.8175 59.602 44.0698 60.2355 43.3129C60.7423 42.7075 62.136 41.7152 62.7695 41.2947C62.6005 41.9254 62.0346 43.4391 61.1224 44.4482C59.9821 45.7095 47.9459 45.5834 45.9188 46.3402C43.8916 47.0971 44.3984 63.8734 41.8645 63.9995Z" fill="#59452C"/>
      <path d="M1.15045 25.6576C1.56503 25.5747 2.07288 25.4969 2.67402 25.4244C3.28552 25.3518 3.95403 25.3156 4.67953 25.3156C5.49832 25.3156 6.22383 25.4451 6.85606 25.7042C7.49866 25.953 8.04279 26.3106 8.48846 26.777C8.93413 27.2433 9.27097 27.8082 9.49899 28.4715C9.73737 29.1349 9.85656 29.8707 9.85656 30.6792C9.85656 31.529 9.72182 32.3167 9.45235 33.0422C9.19324 33.7574 8.82012 34.3793 8.33299 34.9078C7.85623 35.4261 7.281 35.8355 6.60732 36.136C5.93363 36.4262 5.18221 36.5713 4.35306 36.5713C3.63791 36.5713 3.0005 36.5506 2.44082 36.5091C1.89151 36.478 1.44584 36.4366 1.10381 36.3848C1.11417 35.8873 1.12454 35.452 1.1349 35.0788C1.15563 34.6954 1.17118 34.3015 1.18154 33.8973C1.19191 33.4827 1.20227 33.0111 1.21264 32.4826C1.223 31.954 1.22818 31.2907 1.22818 30.4926C1.22818 29.6945 1.223 28.9017 1.21264 28.114C1.20227 27.3159 1.18154 26.4971 1.15045 25.6576ZM4.46188 26.7148C4.28569 26.7148 4.09394 26.7355 3.88666 26.777C3.68973 26.808 3.48763 26.8495 3.28034 26.9013C3.25961 27.3988 3.24924 27.9585 3.24924 28.5804C3.24924 29.2022 3.24924 29.9588 3.24924 30.8502C3.24924 31.7726 3.24924 32.5707 3.24924 33.2443C3.24924 33.918 3.25443 34.5503 3.26479 35.141C3.48244 35.2447 3.72083 35.2965 3.97994 35.2965C4.50852 35.2965 5.00083 35.2136 5.45687 35.0478C5.92326 34.8819 6.32748 34.6176 6.6695 34.2549C7.01153 33.8921 7.281 33.4309 7.47793 32.8712C7.67485 32.3012 7.77331 31.612 7.77331 30.8035C7.77331 30.0158 7.69558 29.3629 7.54011 28.8447C7.39501 28.3161 7.17736 27.8963 6.88716 27.5854C6.59695 27.2641 6.24456 27.0412 5.82999 26.9169C5.42577 26.7821 4.96974 26.7148 4.46188 26.7148ZM13.4618 32.8712C13.5136 33.6589 13.6743 34.2134 13.9437 34.5347C14.2132 34.8456 14.6226 35.0011 15.1719 35.0011C15.5865 35.0011 15.9752 34.9389 16.3379 34.8146C16.711 34.6902 17.0168 34.5762 17.2552 34.4725V35.7629C16.9235 36.0635 16.5089 36.2708 16.0114 36.3848C15.514 36.5091 15.032 36.5713 14.5656 36.5713C14.1821 36.5713 13.8038 36.5247 13.4307 36.4314C13.0576 36.3381 12.7207 36.1619 12.4202 35.9028C12.13 35.6333 11.8916 35.2654 11.705 34.799C11.5288 34.3222 11.4407 33.7004 11.4407 32.9334C11.4407 32.1768 11.534 31.5187 11.7206 30.959C11.9071 30.3889 12.1611 29.9174 12.4824 29.5442C12.814 29.1711 13.1975 28.8913 13.6328 28.7047C14.0785 28.5182 14.5604 28.4249 15.0786 28.4249C15.6072 28.4249 16.0374 28.5182 16.369 28.7047C16.711 28.8809 16.9753 29.1089 17.1619 29.3888C17.3588 29.6686 17.4884 29.9796 17.5506 30.3216C17.6231 30.6636 17.6594 30.9953 17.6594 31.3166C17.6594 31.6482 17.6335 31.9488 17.5817 32.2183C17.5402 32.4877 17.4832 32.7054 17.4106 32.8712H13.4618ZM14.7988 29.5598C14.3946 29.5598 14.0785 29.736 13.8505 30.0884C13.6328 30.4304 13.5033 30.9745 13.4618 31.7208H16.027C16.027 31.6793 16.027 31.6275 16.027 31.5653C16.0374 31.5031 16.0425 31.4461 16.0425 31.3943C16.0425 31.2285 16.027 31.0419 15.9959 30.8346C15.9648 30.617 15.9026 30.4149 15.8093 30.2283C15.7161 30.0417 15.5865 29.8863 15.4207 29.7619C15.2652 29.6272 15.0579 29.5598 14.7988 29.5598ZM30.3663 27.0257H27.2881C27.2674 27.5128 27.257 28.0621 27.257 28.6736C27.257 29.2748 27.257 30.0003 27.257 30.8502C27.257 31.472 27.257 32.0369 27.257 32.5447C27.257 33.0422 27.257 33.5086 27.257 33.9439C27.2674 34.3793 27.2725 34.7938 27.2725 35.1877C27.2829 35.5815 27.2933 35.9806 27.3036 36.3848H25.1116C25.1219 35.8873 25.1323 35.452 25.1427 35.0788C25.1634 34.6954 25.1789 34.3015 25.1893 33.8973C25.1997 33.4827 25.21 33.0111 25.2204 32.4826C25.2308 31.954 25.2359 31.2907 25.2359 30.4926C25.2359 29.9122 25.2359 29.337 25.2359 28.7669C25.2359 28.1969 25.2256 27.6165 25.2048 27.0257H22.1266V25.5021H30.3663V27.0257ZM32.3054 32.8712C32.3572 33.6589 32.5179 34.2134 32.7873 34.5347C33.0568 34.8456 33.4662 35.0011 34.0155 35.0011C34.4301 35.0011 34.8188 34.9389 35.1815 34.8146C35.5546 34.6902 35.8604 34.5762 36.0988 34.4725V35.7629C35.7671 36.0635 35.3525 36.2708 34.855 36.3848C34.3576 36.5091 33.8756 36.5713 33.4092 36.5713C33.0257 36.5713 32.6474 36.5247 32.2743 36.4314C31.9012 36.3381 31.5643 36.1619 31.2638 35.9028C30.9736 35.6333 30.7352 35.2654 30.5486 34.799C30.3724 34.3222 30.2843 33.7004 30.2843 32.9334C30.2843 32.1768 30.3776 31.5187 30.5642 30.959C30.7507 30.3889 31.0047 29.9174 31.326 29.5442C31.6576 29.1711 32.0411 28.8913 32.4764 28.7047C32.9221 28.5182 33.404 28.4249 33.9223 28.4249C34.4508 28.4249 34.881 28.5182 35.2126 28.7047C35.5546 28.8809 35.8189 29.1089 36.0055 29.3888C36.2024 29.6686 36.332 29.9796 36.3942 30.3216C36.4667 30.6636 36.503 30.9953 36.503 31.3166C36.503 31.6482 36.4771 31.9488 36.4253 32.2183C36.3838 32.4877 36.3268 32.7054 36.2542 32.8712H32.3054ZM33.6424 29.5598C33.2382 29.5598 32.9221 29.736 32.6941 30.0884C32.4764 30.4304 32.3469 30.9745 32.3054 31.7208H34.8706C34.8706 31.6793 34.8706 31.6275 34.8706 31.5653C34.881 31.5031 34.8861 31.4461 34.8861 31.3943C34.8861 31.2285 34.8706 31.0419 34.8395 30.8346C34.8084 30.617 34.7462 30.4149 34.6529 30.2283C34.5597 30.0417 34.4301 29.8863 34.2643 29.7619C34.1088 29.6272 33.9015 29.5598 33.6424 29.5598ZM39.594 28.3316C39.8116 28.6736 39.9826 28.9742 40.107 29.2333C40.2314 29.4821 40.3195 29.7464 40.3713 30.0262C40.475 29.8707 40.6045 29.7049 40.76 29.5287C40.9154 29.3421 41.0916 29.1711 41.2886 29.0157C41.4855 28.8498 41.7031 28.7047 41.9415 28.5804C42.1799 28.456 42.4338 28.3731 42.7033 28.3316L42.8432 30.5392C42.3354 30.5392 41.8638 30.5859 41.4285 30.6792C40.9932 30.7621 40.6822 30.9072 40.4957 31.1145C40.506 31.3114 40.5112 31.529 40.5112 31.7674C40.5112 31.9954 40.5112 32.2545 40.5112 32.5447C40.5112 32.8764 40.5164 33.234 40.5268 33.6175C40.5371 33.9906 40.5475 34.3533 40.5579 34.7057C40.5786 35.0478 40.5993 35.3691 40.6201 35.6696C40.6408 35.9702 40.6615 36.2086 40.6822 36.3848H38.4902C38.5005 36.1671 38.5109 35.9132 38.5213 35.623C38.5316 35.3328 38.542 35.0322 38.5524 34.7213C38.5627 34.4103 38.5679 34.0942 38.5679 33.7729C38.5783 33.4413 38.5834 33.1252 38.5834 32.8246C38.5834 32.3478 38.5731 31.9592 38.5524 31.6586C38.5316 31.3477 38.4902 31.0834 38.428 30.8657C38.3658 30.6377 38.2829 30.4304 38.1792 30.2438C38.0756 30.0573 37.9409 29.8396 37.775 29.5909L39.594 28.3316ZM45.7082 28.4249C45.9155 28.7255 46.0813 28.9898 46.2057 29.2178C46.33 29.4458 46.4233 29.679 46.4855 29.9174C46.641 29.7515 46.8172 29.5805 47.0141 29.4043C47.211 29.2178 47.4183 29.0571 47.636 28.9224C47.864 28.7773 48.1075 28.6581 48.3666 28.5648C48.6258 28.4715 48.8952 28.4249 49.1751 28.4249C49.4342 28.4249 49.6829 28.4715 49.9213 28.5648C50.1701 28.6581 50.3877 28.8136 50.5743 29.0312C50.7608 29.2489 50.9111 29.5442 51.0251 29.9174C51.1391 30.2905 51.1961 30.7569 51.1961 31.3166C51.1961 31.4617 51.191 31.6741 51.1806 31.954C51.1806 32.2338 51.1754 32.5344 51.165 32.8557C51.1547 33.1666 51.1443 33.4672 51.1339 33.7574C51.1339 34.0476 51.1339 34.2704 51.1339 34.4259C51.1339 34.7679 51.1547 35.0996 51.1961 35.4209C51.248 35.7318 51.3309 35.9909 51.4449 36.1982L49.2839 36.5713C49.2113 36.3329 49.1647 36.0738 49.144 35.794C49.1336 35.5142 49.1284 35.2706 49.1284 35.0633C49.1284 34.7731 49.1336 34.4777 49.144 34.1771C49.1647 33.8662 49.1803 33.5708 49.1906 33.291C49.2113 33.0008 49.2269 32.7313 49.2373 32.4826C49.258 32.2235 49.2684 32.0006 49.2684 31.8141C49.2684 31.2026 49.1647 30.7828 48.9574 30.5548C48.7501 30.3268 48.4651 30.2128 48.1024 30.2128C47.8018 30.2128 47.5219 30.2594 47.2628 30.3527C47.0141 30.446 46.7913 30.56 46.5943 30.6947C46.6151 30.8916 46.6254 31.1093 46.6254 31.3477C46.6254 31.586 46.6254 31.8607 46.6254 32.1716C46.6254 32.6484 46.6254 33.0785 46.6254 33.462C46.6254 33.8455 46.6254 34.2031 46.6254 34.5347C46.6358 34.8664 46.641 35.1825 46.641 35.4831C46.6513 35.7733 46.6617 36.0738 46.6721 36.3848H44.5733C44.5836 36.136 44.594 35.8562 44.6044 35.5452C44.6147 35.2343 44.6251 34.9078 44.6355 34.5658C44.6562 34.2134 44.6717 33.8558 44.6821 33.4931C44.6925 33.12 44.6976 32.7624 44.6976 32.4204C44.6976 32.0162 44.6873 31.6897 44.6666 31.4409C44.6458 31.1818 44.6044 30.959 44.5422 30.7724C44.48 30.5755 44.3971 30.3993 44.2934 30.2438C44.1898 30.078 44.0551 29.8915 43.8892 29.6842L45.7082 28.4249ZM55.0964 32.8712C55.1482 33.6589 55.3089 34.2134 55.5783 34.5347C55.8478 34.8456 56.2572 35.0011 56.8065 35.0011C57.2211 35.0011 57.6098 34.9389 57.9725 34.8146C58.3456 34.6902 58.6514 34.5762 58.8898 34.4725V35.7629C58.5581 36.0635 58.1435 36.2708 57.646 36.3848C57.1485 36.5091 56.6666 36.5713 56.2002 36.5713C55.8167 36.5713 55.4384 36.5247 55.0653 36.4314C54.6922 36.3381 54.3553 36.1619 54.0548 35.9028C53.7646 35.6333 53.5262 35.2654 53.3396 34.799C53.1634 34.3222 53.0753 33.7004 53.0753 32.9334C53.0753 32.1768 53.1686 31.5187 53.3552 30.959C53.5417 30.3889 53.7957 29.9174 54.117 29.5442C54.4486 29.1711 54.8321 28.8913 55.2674 28.7047C55.7131 28.5182 56.195 28.4249 56.7132 28.4249C57.2418 28.4249 57.672 28.5182 58.0036 28.7047C58.3456 28.8809 58.6099 29.1089 58.7965 29.3888C58.9934 29.6686 59.123 29.9796 59.1852 30.3216C59.2577 30.6636 59.294 30.9953 59.294 31.3166C59.294 31.6482 59.2681 31.9488 59.2162 32.2183C59.1748 32.4877 59.1178 32.7054 59.0452 32.8712H55.0964ZM56.4334 29.5598C56.0292 29.5598 55.7131 29.736 55.4851 30.0884C55.2674 30.4304 55.1379 30.9745 55.0964 31.7208H57.6616C57.6616 31.6793 57.6616 31.6275 57.6616 31.5653C57.672 31.5031 57.6771 31.4461 57.6771 31.3943C57.6771 31.2285 57.6616 31.0419 57.6305 30.8346C57.5994 30.617 57.5372 30.4149 57.4439 30.2283C57.3507 30.0417 57.2211 29.8863 57.0553 29.7619C56.8998 29.6272 56.6925 29.5598 56.4334 29.5598ZM62.385 28.3316C62.6026 28.6736 62.7736 28.9742 62.898 29.2333C63.0224 29.4821 63.1105 29.7464 63.1623 30.0262C63.2659 29.8707 63.3955 29.7049 63.551 29.5287C63.7064 29.3421 63.8826 29.1711 64.0795 29.0157C64.2765 28.8498 64.4941 28.7047 64.7325 28.5804C64.9709 28.456 65.2248 28.3731 65.4943 28.3316L65.6342 30.5392C65.1264 30.5392 64.6548 30.5859 64.2195 30.6792C63.7842 30.7621 63.4732 30.9072 63.2867 31.1145C63.297 31.3114 63.3022 31.529 63.3022 31.7674C63.3022 31.9954 63.3022 32.2545 63.3022 32.5447C63.3022 32.8764 63.3074 33.234 63.3178 33.6175C63.3281 33.9906 63.3385 34.3533 63.3489 34.7057C63.3696 35.0478 63.3903 35.3691 63.411 35.6696C63.4318 35.9702 63.4525 36.2086 63.4732 36.3848H61.2812C61.2915 36.1671 61.3019 35.9132 61.3122 35.623C61.3226 35.3328 61.333 35.0322 61.3433 34.7213C61.3537 34.4103 61.3589 34.0942 61.3589 33.7729C61.3693 33.4413 61.3744 33.1252 61.3744 32.8246C61.3744 32.3478 61.3641 31.9592 61.3433 31.6586C61.3226 31.3477 61.2812 31.0834 61.219 30.8657C61.1568 30.6377 61.0739 30.4304 60.9702 30.2438C60.8666 30.0573 60.7318 29.8396 60.566 29.5909L62.385 28.3316ZM68.8126 36.5713C68.1597 36.5713 67.6311 36.3485 67.2269 35.9028C66.833 35.4572 66.6361 34.8767 66.6361 34.1616C66.6361 33.4154 66.8538 32.8194 67.2891 32.3737C67.7244 31.9281 68.3048 31.7052 69.0303 31.7052C69.3309 31.7052 69.6314 31.7467 69.932 31.8296C70.2326 31.9125 70.502 32.0317 70.7404 32.1872V31.3166C70.7404 30.8294 70.6471 30.4874 70.4606 30.2905C70.274 30.0936 69.9527 29.9951 69.4967 29.9951C69.1858 29.9951 68.8541 30.0366 68.5017 30.1195C68.1597 30.192 67.885 30.2853 67.6777 30.3993L67.1958 28.9068C67.3513 28.8447 67.5378 28.7825 67.7555 28.7203C67.9731 28.6581 68.2063 28.6063 68.4551 28.5648C68.7038 28.5234 68.9577 28.4923 69.2169 28.4715C69.476 28.4404 69.7143 28.4249 69.932 28.4249C71.7561 28.4249 72.6682 29.3162 72.6682 31.0989C72.6682 31.2544 72.6578 31.4824 72.6371 31.783C72.6268 32.0835 72.6112 32.3996 72.5905 32.7313C72.5801 33.0526 72.5646 33.3532 72.5438 33.633C72.5335 33.9129 72.5283 34.1098 72.5283 34.2238C72.5283 34.4622 72.5646 34.6332 72.6371 34.7368C72.7097 34.8405 72.8444 34.8923 73.0413 34.8923C73.1761 34.8923 73.3315 34.8716 73.5077 34.8301L73.259 36.3226C73.0931 36.3744 72.9377 36.4159 72.7926 36.447C72.6578 36.478 72.5179 36.4936 72.3728 36.4936C71.9893 36.4936 71.668 36.3899 71.4089 36.1827C71.1498 35.965 70.9944 35.6593 70.9425 35.2654C70.7352 35.6696 70.445 35.9909 70.0719 36.2293C69.6988 36.4573 69.279 36.5713 68.8126 36.5713ZM69.5589 35.141C69.8905 35.141 70.1704 35.0218 70.3984 34.7835C70.6368 34.5451 70.756 34.2445 70.756 33.8818C70.756 33.5708 70.6627 33.3221 70.4761 33.1355C70.2896 32.949 70.0305 32.8557 69.6988 32.8557C69.3568 32.8557 69.0873 32.9593 68.8904 33.1666C68.6935 33.3739 68.595 33.6589 68.595 34.0217C68.595 34.3637 68.6779 34.6384 68.8437 34.8456C69.0199 35.0426 69.2583 35.141 69.5589 35.141Z" fill="#2E2E2E"/>
      </svg>
      )

  return (
    <div style={styles.container}>
      <div></div>
      <NavLink to={"/"}>
     {Logo}
      </NavLink>
      <button >{carrito}</button>
    </div>
  );
};

const styles = {
  container: {
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    padding: "10px",
    backgroundColor: "whitesmoke",

  },
  logo: {
    marginLeft:"1rem",
    maxWidth: "80px",
    height: "auto",
  },
};

export default TopNav;
