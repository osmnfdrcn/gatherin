"use client";
import { useSession } from "next-auth/react";
import React from "react";
type Props = {
  children: React.ReactNode;
};

const Wrapper = ({ children }: Props) => {
  const { status } = useSession();

  if (status === "loading") {
    return (
      <div className="h-full w-full ">
        <div className="absolute z-50 inset-0 bg-gray-100  overflow-y-auto h-full w-full flex items-center justify-center pl-20 md:p-0 ">
          <svg
            width="140"
            height="30"
            viewBox="0 0 384 65"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-labelledby="title-04a desc-04a"
            aria-live="polite"
            aria-busy="true"
            className="animate animate-ping"
            role="img"
          >
            <g>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M107.102 0.309389C105.196 1.10096 103.303 1.92545 101.431 2.79273C100.046 3.43619 99.9186 4.37258 101.164 5.23986C102.647 6.26677 103.082 7.59812 103.077 9.32116C103.034 22.0374 103.035 34.7536 103.077 47.4698C103.082 49.0546 102.688 50.2576 101.304 51.1791C100.869 51.4688 100.737 52.1995 100.466 52.7294C101.004 52.9762 101.536 53.4222 102.081 53.437C104.84 53.5111 107.603 53.5127 110.363 53.4387C110.967 53.4222 111.56 52.9943 112.156 52.7557C111.815 52.1797 111.61 51.4062 111.104 51.0705C109.818 50.2214 109.306 49.1599 109.321 47.6508C109.373 42.3583 109.309 37.0608 109.364 31.7683C109.379 30.4715 109.545 29.1385 109.882 27.8878C110.907 24.0813 113.975 21.6408 117.81 21.4252C121.449 21.2195 124.298 23.0922 125.773 26.9168C126.386 28.5049 126.837 30.2214 126.965 31.9098C127.359 37.1431 127.533 42.3895 127.867 47.6278C127.962 49.127 127.56 50.2296 126.298 51.1397C125.835 51.4704 125.688 52.2258 125.398 52.7903C125.952 53.0174 126.5 53.4255 127.06 53.4387C129.682 53.5094 132.308 53.5127 134.929 53.4387C135.536 53.4239 136.132 53.019 136.732 52.7919C136.426 52.1879 136.256 51.4326 135.783 51.0113C134.712 50.0634 134.221 48.9854 134.156 47.5751C133.934 42.7845 133.718 37.989 133.319 33.2116C133.156 31.2499 132.723 29.2603 132.082 27.3957C130.025 21.4202 125.081 18.2161 118.713 18.6769C114.887 18.955 111.812 20.7241 109.172 23.6271C109.172 23.0972 109.171 22.5673 109.172 22.0374C109.209 15.2933 109.253 8.55098 109.281 1.80861C109.286 0.567761 109.012 0 108.294 0C107.985 0 107.591 0.105324 107.102 0.309389ZM221.939 8.15013C221.942 10.7947 223.782 12.5112 226.643 12.5359C229.461 12.5622 231.373 10.8063 231.386 8.18304C231.4 5.55159 229.505 3.72488 226.744 3.71007C226.73 3.71007 226.717 3.71007 226.704 3.71007C223.835 3.71007 221.937 5.47753 221.939 8.15013ZM81.8768 12.4724C81.75 13.3216 81.6114 14.1741 81.396 15.0035C80.6131 18.0233 78.9403 19.2872 75.765 19.3086C75.2608 19.3119 74.7516 19.3201 74.2475 19.3102C73.2258 19.2839 72.7283 19.7266 72.7383 20.7733C72.7517 21.8397 73.2942 22.205 74.3009 22.1853C75.6264 22.1589 76.952 22.1787 78.5112 22.1787V24.0087C78.5112 30.2047 78.4996 36.4007 78.5213 42.5967C78.5246 43.7717 78.5713 44.955 78.7516 46.1135C79.6915 52.1334 83.8885 55.0512 89.9736 53.9634C93.8067 53.2805 97.0103 49.6369 96.9369 45.9358C96.9285 45.4701 96.4344 45.0109 96.1656 44.5518C95.6965 44.8891 95.2224 45.215 94.77 45.5721C94.6898 45.6346 94.7249 45.8321 94.6865 45.9588C93.992 48.2891 91.982 49.5958 89.2842 49.4773C87.204 49.3868 85.79 48.062 85.2641 45.6741C85.1373 45.1031 85.0271 44.5156 85.0271 43.933C85.0037 37.059 85.0171 30.1849 84.982 23.3093C84.977 22.3943 85.3242 22.154 86.1924 22.1688C87.6514 22.1902 89.1122 22.1886 90.5713 22.1836C91.7349 22.182 92.8985 22.1787 94.0604 22.1886C95.1372 22.1984 96.017 22.0734 95.9803 20.7058C95.9436 19.4271 95.0922 19.2987 94.0838 19.3037C93.1339 19.3086 92.184 19.3053 91.2357 19.302C89.563 19.2987 87.8885 19.2921 86.2174 19.3267C85.2391 19.3465 84.9453 19.0091 84.9703 18.076C85.0171 16.269 84.9636 14.4588 84.9419 12.6485C84.9319 11.7779 84.6331 11.1674 83.598 11.1312C83.558 11.1295 83.5179 11.1295 83.4795 11.1295C82.5596 11.1295 82.0238 11.5196 81.8768 12.4724ZM186.249 23.319C186.006 23.7386 185.777 24.1665 185.542 24.5894C185.438 24.568 185.333 24.545 185.231 24.5219C185.231 22.9882 185.276 21.4544 185.218 19.9223C185.171 18.716 184.63 18.3885 183.495 18.8608C181.673 19.6162 179.857 20.3929 178.082 21.247C176.505 22.0057 176.41 22.9799 177.854 23.9739C179.239 24.9317 179.742 26.1429 179.729 27.7853C179.668 34.2117 179.657 40.6365 179.734 47.0629C179.757 48.8781 179.406 50.3329 177.75 51.3647C177.38 51.5968 176.979 52.4311 177.128 52.678C177.365 53.0729 178.039 53.3971 178.545 53.4185C180.476 53.5041 182.411 53.4564 184.343 53.4564C185.356 53.4564 186.375 53.5239 187.378 53.4202C187.859 53.3692 188.306 52.9956 188.767 52.7685C188.511 52.2846 188.271 51.7909 187.989 51.3219C187.902 51.182 187.705 51.0965 187.543 51.0092C186.234 50.2983 185.757 49.2253 185.774 47.7541C185.83 42.6426 185.775 37.5294 185.812 32.4163C185.819 31.2018 185.784 29.9083 186.178 28.7909C186.784 27.0744 187.448 25.2329 188.617 23.89C190.72 21.4741 193.905 22.088 195.338 24.9037C195.523 25.2691 195.703 25.6328 195.895 25.9932C196.516 27.1501 197.526 27.5352 198.789 27.3575C200.034 27.1814 200.72 26.4063 201.009 25.2444C201.685 22.5175 200.102 19.8811 197.259 19.0023C196.306 18.7094 195.345 18.5662 194.4 18.5662C191.102 18.5662 188.011 20.2975 186.249 23.319ZM153.794 19.1215C146.136 20.9351 141.011 27.8223 141.041 36.2235C141.074 46.3395 147.073 53.3501 156.645 54.0924C162.321 54.5301 167.178 52.6458 170.505 47.87C171.268 46.7773 171.699 45.4426 172.143 44.1722C172.256 43.8513 171.932 43.1123 171.63 42.9906C171.288 42.8523 170.684 43.0992 170.311 43.351C170.004 43.5633 169.862 44.0158 169.659 44.3696C168.63 46.1486 167.195 47.5096 165.328 48.4263C158.764 51.6502 151.293 48.5628 148.605 41.5193C147.959 39.8276 147.978 39.8243 149.692 39.2664C155.802 37.2817 161.917 35.3085 168.011 33.2761C170.73 32.3693 171.67 30.7072 171.191 27.9144C170.605 24.4964 168.579 22.0772 165.572 20.4447C163.203 19.1594 160.73 18.5834 158.193 18.5834C156.746 18.5834 155.276 18.771 153.794 19.1215ZM151.048 23.3669C155.516 18.7688 162.828 20.844 164.913 27.2112C165.846 30.0615 165.329 31.1329 162.466 32.1598C157.853 33.8153 153.23 35.4495 148.611 37.0886C148.32 37.1906 148.015 37.2597 147.531 37.398C146.987 32.1993 147.219 27.3083 151.048 23.3669ZM247.56 24.013C247.441 24.1776 247.289 24.3158 246.89 24.7519C246.89 23.0272 246.919 21.6482 246.884 20.2707C246.843 18.7073 246.214 18.3107 244.785 18.9608C243.03 19.754 241.298 20.5916 239.565 21.4276C237.95 22.211 237.885 22.9285 239.431 23.8879C240.82 24.7519 241.383 25.9023 241.371 27.5101C241.328 34.2047 241.321 40.901 241.379 47.594C241.393 49.1525 240.91 50.2633 239.585 51.1454C239.109 51.463 238.93 52.2069 238.618 52.7598C239.196 53.0182 239.77 53.4856 240.356 53.502C243.114 53.5827 245.879 53.581 248.638 53.5037C249.234 53.4856 249.817 53.033 250.408 52.7829C250.06 52.2102 249.847 51.44 249.336 51.101C248.054 50.2469 247.551 49.1722 247.566 47.673C247.613 42.3805 247.553 37.088 247.606 31.7955C247.62 30.4954 247.765 29.1656 248.091 27.9083C249.04 24.2418 252.007 21.7913 255.725 21.4392C259.131 21.115 261.955 22.6092 263.491 25.9187C264.298 27.6598 264.93 29.5902 265.095 31.4828C265.575 36.8856 265.742 42.3147 266.101 47.729C266.197 49.1854 265.772 50.237 264.566 51.1158C264.092 51.4597 263.914 52.1888 263.6 52.7434C264.179 53.0083 264.752 53.4823 265.339 53.5004C267.96 53.5827 270.586 53.581 273.207 53.507C273.82 53.4889 274.421 53.0775 275.027 52.8471C274.73 52.2431 274.583 51.4647 274.107 51.0714C273.029 50.181 272.526 49.1311 272.466 47.7849C272.344 45.0745 272.222 42.3624 272.034 39.6569C271.75 35.6052 271.847 31.5009 270.411 27.6006C268.63 22.7639 265.399 19.4643 260.057 18.7633C259.319 18.6662 258.598 18.6185 257.897 18.6185C253.708 18.6185 250.194 20.3596 247.56 24.013ZM227.85 18.918C226.013 19.7507 224.207 20.6509 222.409 21.5593C222.15 21.6893 221.935 21.8144 221.76 21.9361C220.137 21.9477 219.209 21.9575 218.718 21.9641C217.89 21.951 215.705 21.9329 210.698 21.9065C209.374 21.9016 208.918 22.4019 208.93 23.6806C208.942 24.9346 209.351 25.4694 210.698 25.4448C214.237 25.3822 217.775 25.4234 221.316 25.4234C222.291 25.4234 222.867 25.4201 223.262 25.4168C223.666 26.1919 223.832 27.0592 223.823 28.0482C223.77 34.5618 223.771 41.0755 223.823 47.5891C223.833 49.0751 223.407 50.181 222.159 51.0812C221.7 51.4104 221.568 52.1773 221.286 52.7434C221.837 52.982 222.382 53.4082 222.938 53.423C225.65 53.4938 228.367 53.4971 231.082 53.4214C231.678 53.4033 232.261 52.9524 232.85 52.7022C232.506 52.1279 232.297 51.3544 231.788 51.0138C230.513 50.1547 230 49.0965 230.02 47.5874C230.08 43.1556 230.042 38.7221 230.04 34.2887C230.04 29.6297 230.054 24.9708 230.034 20.3119C230.029 19.178 229.683 18.6185 228.965 18.6185C228.661 18.6185 228.291 18.7188 227.85 18.918ZM50.0421 18.6791C47.0154 18.8585 44.1456 19.6649 41.7099 21.5607C40.2225 22.716 39.1056 24.1263 38.957 26.0748C38.8502 27.5033 39.4679 28.4577 40.6765 28.8313C42.0004 29.2394 43.0472 28.8544 43.7433 27.6876C44.3243 26.715 44.8335 25.6996 45.371 24.7023C46.7466 22.1449 48.8635 20.8218 51.8418 20.8942C54.8468 20.9682 57.0004 22.3506 58.3259 24.9755C59.977 28.2438 60.2808 31.7919 60.6064 35.6017C55.9102 32.4732 51.1089 32.3827 46.1857 33.7404C41.8285 34.9417 39.1073 38.1475 38.6665 42.3325C38.2108 46.6689 40.2124 50.5445 44.1106 52.4683C48.1456 54.4563 52.3994 54.6998 56.7316 53.5166C59.0204 52.8879 60.8134 51.5253 62.2808 49.4287C62.4327 50.1215 62.5079 50.5609 62.6247 50.9888C62.9586 52.1869 63.5763 53.3602 64.8685 53.4837C66.8935 53.6746 68.9519 53.5693 70.9886 53.4541C71.376 53.4327 71.987 52.8122 72.0204 52.4271C72.0504 52.0997 71.4628 51.5138 71.0404 51.3821C69.0237 50.7601 68.3042 49.3662 68.1088 47.4144C67.5713 42.0165 67.1806 36.5891 66.2791 31.2472C64.8868 23.0105 59.5897 18.6363 51.4595 18.6363C50.997 18.6363 50.5246 18.6511 50.0421 18.6791ZM44.9976 43.4319C44.7221 38.7187 47.6854 35.4701 52.49 35.2199C58.0426 34.9303 61.0059 37.7494 61.3548 43.6541C61.6252 48.234 58.6703 51.6143 54.1595 51.8809C53.9708 51.8924 53.7822 51.8973 53.5969 51.8973C48.9041 51.8973 45.283 48.3805 44.9976 43.4319ZM12.5345 19.0759C7.28407 19.9432 3.35086 22.8083 1.52616 27.8671C-0.278511 32.875 0.354208 37.6277 4.01697 41.7074C7.37756 45.4464 11.7565 46.8649 16.7615 46.7794C18.254 46.7547 19.8283 46.8073 21.2356 47.2369C24.4393 48.216 26.2306 50.5019 26.5828 53.7998C26.9084 56.8509 25.845 59.331 23.2223 61.0474C17.6864 64.6729 9.75986 62.6125 6.78491 56.8016C6.14718 55.5492 5.67807 54.1866 4.87339 53.0544C4.38258 52.3632 3.44435 51.6934 2.62465 51.5815C0.875075 51.3412 -0.261817 52.9079 0.0520386 54.8909C0.581252 58.2251 2.63133 60.5356 5.43433 62.2504C10.1956 65.1551 15.451 65.3443 20.7899 64.6877C24.2122 64.2664 27.4393 63.2099 30.0586 60.8549C34.5912 56.7818 33.8967 50.2402 28.5912 47.2122C27.6062 46.6494 26.4994 46.2889 25.446 45.8446C25.0553 45.68 24.6513 45.5435 24.1087 45.341C33.1788 41.0343 35.2172 29.554 27.4843 22.7112C28.9318 22.466 30.2022 22.4101 31.3441 22.0036C32.1638 21.7123 33.4276 20.9438 33.4159 20.4089C33.3925 19.196 32.0152 19.3836 31.1104 19.331C27.6646 19.1351 24.2156 18.9459 20.7682 18.8817C19.3926 18.8554 18.0019 18.7928 16.6196 18.7928C15.2423 18.7928 13.8717 18.8537 12.5345 19.0759ZM11.6778 42.3263C7.52919 38.8095 5.62268 31.0616 7.67443 26.0785C9.82301 20.865 16.0651 19.2522 20.7612 22.7279C23.5091 24.7619 24.9315 27.6139 25.6527 30.8312C25.9398 32.1083 26.0316 33.4248 26.262 35.0985C25.9465 36.3097 25.7378 37.9093 25.1235 39.3411C23.7011 42.6555 20.611 44.469 17.3989 44.469C15.4173 44.469 13.3906 43.7795 11.6778 42.3263Z"
                fill="#B20056"
              />
            </g>
          </svg>
        </div>
      </div>
    );
  }
  return <div>{children}</div>;
};

export default Wrapper;
