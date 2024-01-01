export const DragScreenIcon = {
  FileUpload: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="90"
      height="90"
      viewBox="0 0 256 256"
      fill="none"
      id="my-svg"
    >
      <defs>
        <pattern
          id="a"
          patternUnits="userSpaceOnUse"
          width="80"
          height="80"
          patternTransform="scale(3.19) rotate(0)"
        >
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="hsla(0,0%,100%,1)"
          />
          <path
            d="M-20.133 4.568C-13.178 4.932-6.452 7.376 0 10c6.452 2.624 13.036 5.072 20 5 6.967-.072 13.56-2.341 20-5 6.44-2.659 13.033-4.928 20-5 6.964-.072 13.548 2.376 20 5s13.178 5.068 20.133 5.432"
            strokeWidth="30"
            stroke="#EDE4FF"
            fill="none"
          />
          <path
            d="M-20.133 24.568C-13.178 24.932-6.452 27.376 0 30c6.452 2.624 13.036 5.072 20 5 6.967-.072 13.56-2.341 20-5 6.44-2.659 13.033-4.928 20-5 6.964-.072 13.548 2.376 20 5s13.178 5.068 20.133 5.432"
            strokeWidth="30"
            stroke="#D7BBF5"
            fill="none"
          />
          <path
            d="M-20.133 44.568C-13.178 44.932-6.452 47.376 0 50c6.452 2.624 13.036 5.072 20 5 6.967-.072 13.56-2.341 20-5 6.44-2.659 13.033-4.928 20-5 6.964-.072 13.548 2.376 20 5s13.178 5.068 20.133 5.432"
            strokeWidth="30"
            stroke="#A076F9"
            fill="none"
          />
          <path
            d="M-20.133 64.568C-13.178 64.932-6.452 67.376 0 70c6.452 2.624 13.036 5.072 20 5 6.967-.072 13.56-2.341 20-5 6.44-2.659 13.033-4.928 20-5 6.964-.072 13.548 2.376 20 5s13.178 5.068 20.133 5.432"
            strokeWidth="30"
            stroke="#6528F7"
            fill="none"
          />
        </pattern>
        <linearGradient id="gradient1">
          <stop className="stop1" offset="0%" stopColor="#ffbbb8" />
          <stop className="stop2" offset="100%" stopColor="#3d12ff" />
        </linearGradient>
      </defs>

      <g id="group" transform="translate(0,0) scale(1)">
        <path
          d="M85.333 191.622L74.667 192.000C51.103 192.000 32.000 172.897 32.000 149.333C32.000 125.770 51.103 106.667 74.667 106.667C75.023 106.667 75.377 106.671 75.731 106.679C80.667 82.329 102.193 64.000 128.000 64.000C157.455 64.000 181.333 87.878 181.333 117.333L181.332 117.712C183.074 117.462 184.855 117.333 186.667 117.333C207.285 117.333 224.000 134.048 224.000 154.667C224.000 173.474 210.092 189.034 192.000 191.622V192.000L170.667 191.622"
          stroke="#d1d1d1"
          strokeWidth="14"
          strokeLinecap="round"
          strokeLinejoin="round"
          id="primary"
        />
        <path
          d="M128.000 128.000V192.000M128.000 128.000L96.000 160.000M128.000 128.000L160.000 160.000"
          stroke="url(#a)"
          strokeWidth="14"
          strokeLinecap="round"
          strokeLinejoin="round"
          id="secondary"
        />
      </g>
    </svg>
  ),
};

export const FileViewerIcon = {
  Grid: ({ isSelected }: { isSelected: boolean }) => (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className={`${isSelected ? 'fill-stone-400' : 'fill-stone-200'}`}
        d="M8 8H4V4h4zm6-4h-4v4h4zm6 0h-4v4h4zM8 10H4v4h4zm6 0h-4v4h4zm6 0h-4v4h4zM8 16H4v4h4zm6 0h-4v4h4zm6 0h-4v4h4z"
      />
    </svg>
  ),
  List: ({ isSelected }: { isSelected: boolean }) => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className={`${isSelected ? 'fill-stone-400' : 'fill-stone-200'}`}
        d="M80 368H16a16 16 0 0 0-16 16v64a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16v-64a16 16 0 0 0-16-16m0-320H16A16 16 0 0 0 0 64v64a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16V64a16 16 0 0 0-16-16m0 160H16a16 16 0 0 0-16 16v64a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16v-64a16 16 0 0 0-16-16m416 176H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16m0-320H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16V80a16 16 0 0 0-16-16m0 160H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16"
      />
    </svg>
  ),
};

export const DrawerIcon = {
  SearchSimilarMetadata: () => (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="#e7e5e4"
        d="M5 2a3 3 0 1 0 3 3a3 3 0 0 0-3-3m7 0a3 3 0 1 0 3 3a3 3 0 0 0-3-3m7 6a3 3 0 1 0-3-3a3 3 0 0 0 3 3M5 9a3 3 0 1 0 3 3a3 3 0 0 0-3-3m7 0a3 3 0 1 0 3 3a3 3 0 0 0-3-3m7 0a3 3 0 1 0 3 3a3 3 0 0 0-3-3M5 16a3 3 0 1 0 3 3a3 3 0 0 0-3-3m7 0a3 3 0 1 0 3 3a3 3 0 0 0-3-3m7 0a3 3 0 1 0 3 3a3 3 0 0 0-3-3"
      />
    </svg>
  ),
  RightArrow: () => (
    <svg
      width="24"
      height="24 "
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="#e7e5e4"
        d="m12.404 8.303l3.431 3.327c.22.213.22.527 0 .74l-6.63 6.43C8.79 19.201 8 18.958 8 18.43v-5.723z"
      />
      <path
        fill="#e7e5e4"
        d="M8 11.293V5.57c0-.528.79-.771 1.205-.37l2.481 2.406z"
        opacity=".5"
      />
    </svg>
  ),
  SearchSimilarTags: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none">
        <path
          stroke="#e7e5e4"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 10.586V5a1 1 0 0 1 1-1h5.586a1 1 0 0 1 .707.293l8.5 8.5a1 1 0 0 1 0 1.414l-5.586 5.586a1 1 0 0 1-1.414 0l-8.5-8.5A1 1 0 0 1 4 10.586z"
        />
        <circle cx="8.5" cy="8.5" r="1.5" fill="#e7e5e4" />
      </g>
    </svg>
  ),
  ThumbnailSearch: () => (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="#e7e5e4"
        d="M4.115 18q-.666 0-1.14-.475q-.475-.474-.475-1.14v-8.77q0-.666.475-1.14Q3.449 6 4.115 6h8.77q.666 0 1.14.475q.475.474.475 1.14v8.77q0 .666-.475 1.14q-.474.475-1.14.475zm13.202-7q-.357 0-.587-.23q-.23-.23-.23-.587V6.817q0-.357.23-.587q.23-.23.587-.23h3.366q.357 0 .587.23q.23.23.23.587v3.366q0 .357-.23.587q-.23.23-.587.23zM5.5 14.904h6q.233 0 .349-.217q.116-.218-.026-.43l-1.625-2.174q-.13-.162-.323-.162t-.323.162L8 14.153l-1.052-1.395q-.13-.162-.323-.162t-.323.162l-1.125 1.5q-.142.211-.026.429q.116.217.349.217M17.317 18q-.357 0-.587-.23q-.23-.23-.23-.587v-3.366q0-.357.23-.587q.23-.23.587-.23h3.366q.357 0 .587.23q.23.23.23.587v3.366q0 .357-.23.587q-.23.23-.587.23z"
      />
    </svg>
  ),
  SmallX: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="fill-red-600"
        d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8L4.646 5.354a.5.5 0 0 1 0-.708"
      />
    </svg>
  ),
  SmallAdd: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="#e7e5e4"
        d="M16 10c0 .553-.048 1-.601 1H11v4.399c0 .552-.447.601-1 .601c-.553 0-1-.049-1-.601V11H4.601C4.049 11 4 10.553 4 10c0-.553.049-1 .601-1H9V4.601C9 4.048 9.447 4 10 4c.553 0 1 .048 1 .601V9h4.399c.553 0 .601.447.601 1z"
      />
    </svg>
  ),
  Add: () => (
    <svg
      width="28"
      height="28"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="#e7e5e4"
        d="M16 10c0 .553-.048 1-.601 1H11v4.399c0 .552-.447.601-1 .601c-.553 0-1-.049-1-.601V11H4.601C4.049 11 4 10.553 4 10c0-.553.049-1 .601-1H9V4.601C9 4.048 9.447 4 10 4c.553 0 1 .048 1 .601V9h4.399c.553 0 .601.447.601 1z"
      />
    </svg>
  ),
  Group: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="#e7e5e4"
        d="m12.41 148.02l232.94 105.67c6.8 3.09 14.49 3.09 21.29 0l232.94-105.67c16.55-7.51 16.55-32.52 0-40.03L266.65 2.31a25.607 25.607 0 0 0-21.29 0L12.41 107.98c-16.55 7.51-16.55 32.53 0 40.04zm487.18 88.28l-58.09-26.33l-161.64 73.27c-7.56 3.43-15.59 5.17-23.86 5.17s-16.29-1.74-23.86-5.17L70.51 209.97l-58.1 26.33c-16.55 7.5-16.55 32.5 0 40l232.94 105.59c6.8 3.08 14.49 3.08 21.29 0L499.59 276.3c16.55-7.5 16.55-32.5 0-40zm0 127.8l-57.87-26.23l-161.86 73.37c-7.56 3.43-15.59 5.17-23.86 5.17s-16.29-1.74-23.86-5.17L70.29 337.87L12.41 364.1c-16.55 7.5-16.55 32.5 0 40l232.94 105.59c6.8 3.08 14.49 3.08 21.29 0L499.59 404.1c16.55-7.5 16.55-32.5 0-40z"
      />
    </svg>
  ),
  Click: () => (
    <svg
      width="26"
      height="26"
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <mask id="ipTClick0">
          <g
            fill="none"
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="4"
          >
            <path d="M24 4v8" />
            <path
              fill="#555"
              fillRule="evenodd"
              d="m22 22l20 4l-6 4l6 6l-6 6l-6-6l-4 6l-4-20Z"
              clipRule="evenodd"
            />
            <path d="m38.142 9.858l-5.657 5.657M9.858 38.142l5.657-5.657M4 24h8M9.858 9.858l5.657 5.657" />
          </g>
        </mask>
      </defs>
      <path fill="#e7e5e4" d="M0 0h48v48H0z" mask="url(#ipTClick0)" />
    </svg>
  ),
  Trash: () => (
    <svg
      width="26"
      height="26"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="#e7e5e4"
        d="M12 4h3c.6 0 1 .4 1 1v1H3V5c0-.6.5-1 1-1h3c.2-1.1 1.3-2 2.5-2s2.3.9 2.5 2zM8 4h3c-.2-.6-.9-1-1.5-1S8.2 3.4 8 4zM4 7h11l-.9 10.1c0 .5-.5.9-1 .9H5.9c-.5 0-.9-.4-1-.9L4 7z"
      />
    </svg>
  ),
  SearchMemo: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="#e7e5e4"
        d="M18 3v2H2V3zm-6 4v2H2V7zm6 0v2h-4V7zM8 11v2H2v-2zm10 0v2h-8v-2zm-4 4v2H2v-2z"
      />
    </svg>
  ),
};

export const FileIcon = {
  Docs: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="70"
      height="70"
      viewBox="0 0 148 148"
      fill="none"
    >
      <g filter="url(#filter0_b_26_54)">
        <path
          d="M27.6339 67.793C27.6339 58.1319 27.6339 53.3014 30.3169 49.7444C33 46.1874 37.6446 44.8604 46.934 42.2063L63.2366 37.5484C68.6837 35.9921 71.4072 35.214 74.2024 35.214C76.9976 35.214 79.7211 35.9921 85.1681 37.5484L101.471 42.2063C110.76 44.8604 115.405 46.1874 118.088 49.7444C120.771 53.3014 120.771 58.1319 120.771 67.793V80.9838C120.771 99.8003 120.771 109.209 114.925 115.054C109.08 120.9 99.6715 120.9 80.855 120.9H67.5497C48.7332 120.9 39.325 120.9 33.4794 115.054C27.6339 109.209 27.6339 99.8003 27.6339 80.9838V67.793Z"
          fill="url(#paint0_linear_26_54)"
        />
      </g>
      <g filter="url(#filter1_b_26_54)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M44.2658 21.1101C38.7545 21.1101 34.2868 27.2754 34.2868 34.8806V65.0173C53.8302 79.843 64.1167 94.2152 74.2026 94.2888C84.5022 94.3639 94.5927 79.8296 114.118 65.0173V34.8806C114.118 27.2754 109.651 21.1101 104.139 21.1101H44.2658Z"
          fill="#B9DDFF"
          fillOpacity="0.6"
        />
        <path
          d="M34.5928 34.8806C34.5928 31.1354 35.6933 27.7572 37.4573 25.3229C39.2216 22.8883 41.6326 21.4161 44.2658 21.4161H104.139C106.773 21.4161 109.184 22.8883 110.948 25.3229C112.712 27.7572 113.812 31.1354 113.812 34.8806V64.8655C106.824 70.1775 101.037 75.4562 96.0283 80.025C94.0753 81.8065 92.2406 83.4801 90.4991 85.0057C87.3768 87.7409 84.5575 89.9977 81.884 91.5659C79.2121 93.1332 76.7052 94.0011 74.2049 93.9829C71.7571 93.965 69.2769 93.0797 66.6148 91.5056C63.9517 89.931 61.1267 87.6794 57.992 84.9542C56.233 83.425 54.3775 81.7474 52.4015 79.9609C47.3761 75.4174 41.5715 70.1692 34.5928 64.8655V34.8806Z"
          stroke="url(#paint1_linear_26_54)"
          strokeWidth="0.611895"
        />
      </g>
      <rect
        x="93.9158"
        y="41.3128"
        width="6.16312"
        height="39.4263"
        rx="3.08156"
        transform="rotate(90 93.9158 41.3128)"
        fill="url(#paint2_linear_26_54)"
        fillOpacity="0.9"
        stroke="url(#paint3_linear_26_54)"
        strokeWidth="0.489516"
      />
      <rect
        x="93.9158"
        y="61.2707"
        width="6.16312"
        height="39.4263"
        rx="3.08156"
        transform="rotate(90 93.9158 61.2707)"
        fill="url(#paint4_linear_26_54)"
        fillOpacity="0.9"
        stroke="url(#paint5_linear_26_54)"
        strokeWidth="0.489516"
      />
      <defs>
        <filter
          id="filter0_b_26_54"
          x="14.3286"
          y="21.9087"
          width="119.747"
          height="112.296"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="6.65264" />
          <feComposite
            in2="SourceAlpha"
            operator="in"
            result="effect1_backgroundBlur_26_54"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_backgroundBlur_26_54"
            result="shape"
          />
        </filter>
        <filter
          id="filter1_b_26_54"
          x="20.9815"
          y="7.80484"
          width="106.442"
          height="99.7895"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="6.65264" />
          <feComposite
            in2="SourceAlpha"
            operator="in"
            result="effect1_backgroundBlur_26_54"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_backgroundBlur_26_54"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_26_54"
          x1="54.5003"
          y1="53.3338"
          x2="124.776"
          y2="79.36"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#7FC0FB" />
          <stop offset="1" stopColor="#4088F4" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_26_54"
          x1="77.5289"
          y1="10.1333"
          x2="76.1327"
          y2="79.625"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="0.996024" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_26_54"
          x1="97.8656"
          y1="87.2766"
          x2="97.8656"
          y2="33.6956"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_26_54"
          x1="80.9334"
          y1="94.4867"
          x2="109.692"
          y2="33.2972"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint4_linear_26_54"
          x1="91.7991"
          y1="101.281"
          x2="97.7525"
          y2="52.9919"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint5_linear_26_54"
          x1="84.8395"
          y1="103.43"
          x2="108.091"
          y2="61.8216"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  ),
  Video: () => (
    <svg
      width="70"
      height="70"
      viewBox="0 0 148 148"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_b_26_449)">
        <rect
          x="22.2029"
          y="28.3503"
          width="91.3972"
          height="71.812"
          rx="19.5851"
          fill="url(#paint0_linear_26_449)"
        />
      </g>
      <g filter="url(#filter1_b_26_449)">
        <rect
          x="35.2595"
          y="47.9354"
          width="91.3972"
          height="71.812"
          rx="19.5851"
          fill="#BFB5FF"
          fillOpacity="0.6"
        />
        <rect
          x="35.5654"
          y="48.2413"
          width="90.7853"
          height="71.2002"
          rx="19.2792"
          stroke="url(#paint1_linear_26_449)"
          strokeWidth="0.611895"
        />
      </g>
      <path
        d="M69.4907 90.5662L69.4619 81.275C69.4502 77.5133 69.4444 75.6324 70.4999 74.6588C70.7721 74.4077 71.0851 74.2048 71.4253 74.0587C72.7448 73.4923 74.4597 74.265 77.8893 75.8104L89.5005 81.0425C92.6326 82.5655 94.1986 83.327 94.6893 84.3666C95.1069 85.2515 95.1056 86.277 94.6857 87.1607C94.1923 88.1991 92.6243 88.9565 89.4882 90.4713L83.8113 93.2134L78.0136 95.9497C74.5741 97.573 72.8543 98.3847 71.5191 97.8318C71.175 97.6893 70.8578 97.4889 70.5813 97.2394C69.5083 96.2713 69.5024 94.3696 69.4907 90.5662Z"
        fill="url(#paint2_linear_26_449)"
        fillOpacity="0.9"
      />
      <defs>
        <filter
          id="filter0_b_26_449"
          x="9.14612"
          y="15.2936"
          width="117.511"
          height="97.9255"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="6.52837" />
          <feComposite
            in2="SourceAlpha"
            operator="in"
            result="effect1_backgroundBlur_26_449"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_backgroundBlur_26_449"
            result="shape"
          />
        </filter>
        <filter
          id="filter1_b_26_449"
          x="22.2027"
          y="34.8787"
          width="117.511"
          height="97.9255"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="6.52837" />
          <feComposite
            in2="SourceAlpha"
            operator="in"
            result="effect1_backgroundBlur_26_449"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_backgroundBlur_26_449"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_26_449"
          x1="48.5674"
          y1="44.0592"
          x2="114.381"
          y2="72.8647"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#917FFB" />
          <stop offset="1" stopColor="#3F2DAF" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_26_449"
          x1="28.7311"
          y1="54.4638"
          x2="142.978"
          y2="129.54"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_26_449"
          x1="79.4049"
          y1="77.9335"
          x2="73.1937"
          y2="106.484"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  ),
  Excel: () => (
    <svg
      width="48"
      height="48"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id="vscodeIconsFileTypeExcel0"
          x1="4.494"
          x2="13.832"
          y1="-2092.086"
          y2="-2075.914"
          gradientTransform="translate(0 2100)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#18884f" />
          <stop offset=".5" stopColor="#117e43" />
          <stop offset="1" stopColor="#0b6631" />
        </linearGradient>
      </defs>
      <path
        fill="#185c37"
        d="M19.581 15.35L8.512 13.4v14.409A1.192 1.192 0 0 0 9.705 29h19.1A1.192 1.192 0 0 0 30 27.809V22.5Z"
      />
      <path
        fill="#21a366"
        d="M19.581 3H9.705a1.192 1.192 0 0 0-1.193 1.191V9.5L19.581 16l5.861 1.95L30 16V9.5Z"
      />
      <path fill="#107c41" d="M8.512 9.5h11.069V16H8.512Z" />
      <path
        d="M16.434 8.2H8.512v16.25h7.922a1.2 1.2 0 0 0 1.194-1.191V9.391A1.2 1.2 0 0 0 16.434 8.2Z"
        opacity=".1"
      />
      <path
        d="M15.783 8.85H8.512V25.1h7.271a1.2 1.2 0 0 0 1.194-1.191V10.041a1.2 1.2 0 0 0-1.194-1.191Z"
        opacity=".2"
      />
      <path
        d="M15.783 8.85H8.512V23.8h7.271a1.2 1.2 0 0 0 1.194-1.191V10.041a1.2 1.2 0 0 0-1.194-1.191Z"
        opacity=".2"
      />
      <path
        d="M15.132 8.85h-6.62V23.8h6.62a1.2 1.2 0 0 0 1.194-1.191V10.041a1.2 1.2 0 0 0-1.194-1.191Z"
        opacity=".2"
      />
      <path
        fill="url(#vscodeIconsFileTypeExcel0)"
        d="M3.194 8.85h11.938a1.193 1.193 0 0 1 1.194 1.191v11.918a1.193 1.193 0 0 1-1.194 1.191H3.194A1.192 1.192 0 0 1 2 21.959V10.041A1.192 1.192 0 0 1 3.194 8.85Z"
      />
      <path
        fill="#fff"
        d="m5.7 19.873l2.511-3.884l-2.3-3.862h1.847L9.013 14.6c.116.234.2.408.238.524h.017c.082-.188.169-.369.26-.546l1.342-2.447h1.7l-2.359 3.84l2.419 3.905h-1.809l-1.45-2.711A2.355 2.355 0 0 1 9.2 16.8h-.024a1.688 1.688 0 0 1-.168.351l-1.493 2.722Z"
      />
      <path
        fill="#33c481"
        d="M28.806 3h-9.225v6.5H30V4.191A1.192 1.192 0 0 0 28.806 3Z"
      />
      <path fill="#107c41" d="M19.581 16H30v6.5H19.581Z" />
    </svg>
  ),
  Word: () => (
    <svg
      width="48"
      height="48"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id="vscodeIconsFileTypeWord0"
          x1="4.494"
          x2="13.832"
          y1="-1712.086"
          y2="-1695.914"
          gradientTransform="translate(0 1720)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#2368c4" />
          <stop offset=".5" stopColor="#1a5dbe" />
          <stop offset="1" stopColor="#1146ac" />
        </linearGradient>
      </defs>
      <path
        fill="#41a5ee"
        d="M28.806 3H9.705a1.192 1.192 0 0 0-1.193 1.191V9.5l11.069 3.25L30 9.5V4.191A1.192 1.192 0 0 0 28.806 3Z"
      />
      <path fill="#2b7cd3" d="M30 9.5H8.512V16l11.069 1.95L30 16Z" />
      <path fill="#185abd" d="M8.512 16v6.5l10.418 1.3L30 22.5V16Z" />
      <path
        fill="#103f91"
        d="M9.705 29h19.1A1.192 1.192 0 0 0 30 27.809V22.5H8.512v5.309A1.192 1.192 0 0 0 9.705 29Z"
      />
      <path
        d="M16.434 8.2H8.512v16.25h7.922a1.2 1.2 0 0 0 1.194-1.191V9.391A1.2 1.2 0 0 0 16.434 8.2Z"
        opacity=".1"
      />
      <path
        d="M15.783 8.85H8.512V25.1h7.271a1.2 1.2 0 0 0 1.194-1.191V10.041a1.2 1.2 0 0 0-1.194-1.191Z"
        opacity=".2"
      />
      <path
        d="M15.783 8.85H8.512V23.8h7.271a1.2 1.2 0 0 0 1.194-1.191V10.041a1.2 1.2 0 0 0-1.194-1.191Z"
        opacity=".2"
      />
      <path
        d="M15.132 8.85h-6.62V23.8h6.62a1.2 1.2 0 0 0 1.194-1.191V10.041a1.2 1.2 0 0 0-1.194-1.191Z"
        opacity=".2"
      />
      <path
        fill="url(#vscodeIconsFileTypeWord0)"
        d="M3.194 8.85h11.938a1.193 1.193 0 0 1 1.194 1.191v11.918a1.193 1.193 0 0 1-1.194 1.191H3.194A1.192 1.192 0 0 1 2 21.959V10.041A1.192 1.192 0 0 1 3.194 8.85Z"
      />
      <path
        fill="#fff"
        d="M6.9 17.988c.023.184.039.344.046.481h.028c.01-.13.032-.287.065-.47s.062-.338.089-.465l1.255-5.407h1.624l1.3 5.326a7.761 7.761 0 0 1 .162 1h.022a7.6 7.6 0 0 1 .135-.975l1.039-5.358h1.477l-1.824 7.748h-1.727l-1.237-5.126q-.054-.222-.122-.578t-.084-.52h-.021q-.021.189-.084.561c-.042.249-.075.432-.1.552L7.78 19.871H6.024L4.19 12.127h1.5l1.131 5.418a4.469 4.469 0 0 1 .079.443Z"
      />
    </svg>
  ),
  Ppt: () => (
    <svg
      width="48"
      height="48"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id="vscodeIconsFileTypePowerpoint0"
          x1="4.494"
          x2="13.832"
          y1="-1748.086"
          y2="-1731.914"
          gradientTransform="translate(0 1756)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#ca4c28" />
          <stop offset=".5" stopColor="#c5401e" />
          <stop offset="1" stopColor="#b62f14" />
        </linearGradient>
      </defs>
      <path
        fill="#ed6c47"
        d="M18.93 17.3L16.977 3h-.146A12.9 12.9 0 0 0 3.953 15.854V16Z"
      />
      <path
        fill="#ff8f6b"
        d="M17.123 3h-.146v13l6.511 2.6L30 16v-.146A12.9 12.9 0 0 0 17.123 3Z"
      />
      <path
        fill="#d35230"
        d="M30 16v.143A12.905 12.905 0 0 1 17.12 29h-.287a12.907 12.907 0 0 1-12.88-12.857V16Z"
      />
      <path
        d="M17.628 9.389V23.26a1.2 1.2 0 0 1-.742 1.1a1.16 1.16 0 0 1-.45.091H7.027a10.08 10.08 0 0 1-.521-.65a12.735 12.735 0 0 1-2.553-7.657v-.286A12.705 12.705 0 0 1 6.05 8.85a8.82 8.82 0 0 1 .456-.65h9.93a1.2 1.2 0 0 1 1.192 1.189Z"
        opacity=".1"
      />
      <path
        d="M16.977 10.04v13.871a1.15 1.15 0 0 1-.091.448a1.2 1.2 0 0 1-1.1.741H7.62q-.309-.314-.593-.65a10.08 10.08 0 0 1-.521-.65a12.735 12.735 0 0 1-2.553-7.657v-.286A12.705 12.705 0 0 1 6.05 8.85h9.735a1.2 1.2 0 0 1 1.192 1.19Z"
        opacity=".2"
      />
      <path
        d="M16.977 10.04v12.571a1.2 1.2 0 0 1-1.192 1.189H6.506a12.735 12.735 0 0 1-2.553-7.657v-.286A12.705 12.705 0 0 1 6.05 8.85h9.735a1.2 1.2 0 0 1 1.192 1.19Z"
        opacity=".2"
      />
      <path
        d="M16.326 10.04v12.571a1.2 1.2 0 0 1-1.192 1.189H6.506a12.735 12.735 0 0 1-2.553-7.657v-.286A12.705 12.705 0 0 1 6.05 8.85h9.084a1.2 1.2 0 0 1 1.192 1.19Z"
        opacity=".2"
      />
      <path
        fill="url(#vscodeIconsFileTypePowerpoint0)"
        d="M3.194 8.85h11.938a1.193 1.193 0 0 1 1.194 1.191v11.918a1.193 1.193 0 0 1-1.194 1.191H3.194A1.192 1.192 0 0 1 2 21.959V10.041A1.192 1.192 0 0 1 3.194 8.85Z"
      />
      <path
        fill="#fff"
        d="M9.293 12.028a3.287 3.287 0 0 1 2.174.636a2.27 2.27 0 0 1 .756 1.841a2.555 2.555 0 0 1-.373 1.376a2.49 2.49 0 0 1-1.059.935a3.607 3.607 0 0 1-1.591.334H7.687v2.8H6.141v-7.922ZM7.686 15.94h1.331a1.735 1.735 0 0 0 1.177-.351a1.3 1.3 0 0 0 .4-1.025q0-1.309-1.525-1.31H7.686v2.686Z"
      />
    </svg>
  ),
  Image: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="70"
      height="70"
      viewBox="0 0 148 148"
      fill="none"
    >
      <g filter="url(#filter0_b_26_449)">
        <rect
          x="22.2029"
          y="28.3503"
          width="91.3972"
          height="71.812"
          rx="19.5851"
          fill="url(#paint0_linear_26_449)"
        />
      </g>
      <g filter="url(#filter1_b_26_449)">
        <rect
          x="35.2595"
          y="47.9354"
          width="91.3972"
          height="71.812"
          rx="19.5851"
          fill="#BFB5FF"
          fillOpacity="0.6"
        />
        <rect
          x="35.5654"
          y="48.2413"
          width="90.7853"
          height="71.2002"
          rx="19.2792"
          stroke="url(#paint1_linear_26_449)"
          strokeWidth="0.611895"
        />
      </g>
      <path
        d="M107.7 113.219L53.2607 113.219C48.7333 113.219 46.4696 113.219 45.4894 111.97C45.2396 111.652 45.0511 111.29 44.9336 110.903C44.4726 109.384 45.7708 107.529 48.3671 103.82L60.4081 86.6187C62.1699 84.1019 63.0508 82.8435 64.2835 82.566C64.6053 82.4936 64.9362 82.4703 65.265 82.4971C66.5244 82.5996 67.5725 83.7225 69.6687 85.9684L82.7715 100.007C84.7493 102.126 85.7383 103.186 86.9452 103.316C87.2613 103.351 87.5807 103.338 87.8933 103.28C89.0868 103.058 89.9922 101.926 91.8029 99.663L95.8786 94.5684C97.8192 92.1427 98.7894 90.9299 100.048 90.7367C100.376 90.6863 100.71 90.6863 101.038 90.7367C102.297 90.9299 103.267 92.1427 105.208 94.5684L112.364 103.514C115.395 107.303 116.911 109.198 116.493 110.785C116.388 111.188 116.205 111.567 115.957 111.901C114.978 113.219 112.552 113.219 107.7 113.219Z"
        fill="url(#paint2_linear_26_449)"
        fillOpacity="0.9"
      />
      <rect
        x="87.4866"
        y="60.992"
        width="19.5851"
        height="19.5851"
        rx="9.79255"
        fill="url(#paint3_linear_26_449)"
        fillOpacity="0.9"
      />
      <defs>
        <filter
          id="filter0_b_26_449"
          x="9.14612"
          y="15.2936"
          width="117.511"
          height="97.9255"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="6.52837" />
          <feComposite
            in2="SourceAlpha"
            operator="in"
            result="effect1_backgroundBlur_26_449"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_backgroundBlur_26_449"
            result="shape"
          />
        </filter>
        <filter
          id="filter1_b_26_449"
          x="22.2027"
          y="34.8787"
          width="117.511"
          height="97.9255"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="6.52837" />
          <feComposite
            in2="SourceAlpha"
            operator="in"
            result="effect1_backgroundBlur_26_449"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_backgroundBlur_26_449"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_26_449"
          x1="48.5674"
          y1="44.0592"
          x2="114.381"
          y2="72.8647"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#917FFB" />
          <stop offset="1" stopColor="#3F2DAF" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_26_449"
          x1="28.7311"
          y1="54.4638"
          x2="142.978"
          y2="129.54"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_26_449"
          x1="56.9105"
          y1="96.963"
          x2="127.411"
          y2="119.963"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_26_449"
          x1="87.4106"
          y1="65.463"
          x2="124.411"
          y2="89.963"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  ),
  Folder: () => (
    <svg
      width="48"
      height="48"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="#dbeafe"
        stroke="#2563eb"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5 4h4l3 3h7a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2"
      />
    </svg>
  ),
};

export const LeftSidebarIcon = {
  Dashboard: () => (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="#fafaf9"
        d="M5.615 20q-.666 0-1.14-.475Q4 19.051 4 18.385V5.615q0-.666.475-1.14Q4.949 4 5.615 4h4.27q.666 0 1.14.475q.475.474.475 1.14v12.77q0 .666-.475 1.14q-.474.475-1.14.475h-4.27Zm8.5 0q-.666 0-1.14-.475q-.475-.474-.475-1.14v-4.77q0-.666.475-1.14t1.14-.475h4.27q.666 0 1.14.475q.475.474.475 1.14v4.77q0 .666-.475 1.14q-.474.475-1.14.475h-4.27Zm0-9q-.666 0-1.14-.475q-.475-.474-.475-1.14v-3.77q0-.666.475-1.14Q13.449 4 14.115 4h4.27q.666 0 1.14.475q.475.474.475 1.14v3.77q0 .666-.475 1.14q-.474.475-1.14.475h-4.27Z"
      />
    </svg>
  ),
  Activity: () => (
    <svg
      width="25"
      height="25"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="none"
        stroke="#fafaf9"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M22 12h-4l-3 9L9 3l-3 9H2"
      />
    </svg>
  ),

  History: () => (
    <svg
      width="25"
      height="25"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="none"
        stroke="#fafaf9"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4.266 16.06a8.923 8.923 0 0 0 3.915 3.978a8.706 8.706 0 0 0 5.471.832a8.795 8.795 0 0 0 4.887-2.64a9.067 9.067 0 0 0 2.388-5.079a9.135 9.135 0 0 0-1.044-5.53a8.903 8.903 0 0 0-4.069-3.815a8.7 8.7 0 0 0-5.5-.608c-1.85.401-3.366 1.313-4.62 2.755c-.151.16-.735.806-1.22 1.781M7.5 8l-3.609.72L3 5m9 4v4l3 2"
      />
    </svg>
  ),

  Setting: () => (
    <svg
      width="25"
      height="25"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="#fafaf9"
        d="M19.9 12.66a1 1 0 0 1 0-1.32l1.28-1.44a1 1 0 0 0 .12-1.17l-2-3.46a1 1 0 0 0-1.07-.48l-1.88.38a1 1 0 0 1-1.15-.66l-.61-1.83a1 1 0 0 0-.95-.68h-4a1 1 0 0 0-1 .68l-.56 1.83a1 1 0 0 1-1.15.66L5 4.79a1 1 0 0 0-1 .48L2 8.73a1 1 0 0 0 .1 1.17l1.27 1.44a1 1 0 0 1 0 1.32L2.1 14.1a1 1 0 0 0-.1 1.17l2 3.46a1 1 0 0 0 1.07.48l1.88-.38a1 1 0 0 1 1.15.66l.61 1.83a1 1 0 0 0 1 .68h4a1 1 0 0 0 .95-.68l.61-1.83a1 1 0 0 1 1.15-.66l1.88.38a1 1 0 0 0 1.07-.48l2-3.46a1 1 0 0 0-.12-1.17ZM18.41 14l.8.9l-1.28 2.22l-1.18-.24a3 3 0 0 0-3.45 2L12.92 20h-2.56L10 18.86a3 3 0 0 0-3.45-2l-1.18.24l-1.3-2.21l.8-.9a3 3 0 0 0 0-4l-.8-.9l1.28-2.2l1.18.24a3 3 0 0 0 3.45-2L10.36 4h2.56l.38 1.14a3 3 0 0 0 3.45 2l1.18-.24l1.28 2.22l-.8.9a3 3 0 0 0 0 3.98Zm-6.77-6a4 4 0 1 0 4 4a4 4 0 0 0-4-4Zm0 6a2 2 0 1 1 2-2a2 2 0 0 1-2 2Z"
      />
    </svg>
  ),

  Search: () => (
    <svg
      width="22"
      height="22"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="#fafaf9"
        d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33l-1.42 1.42l-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"
      />
    </svg>
  ),
};
