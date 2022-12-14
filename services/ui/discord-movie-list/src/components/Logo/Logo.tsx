import type { Component } from 'solid-js';
import { mergeProps } from 'solid-js';
import { css, keyframes } from 'solid-styled-components';

type LogoSizes = 'tiny' | 'small' | 'medium' | 'large';

const SIZES: { [S in LogoSizes]: string } = {
  tiny: '25px',
  small: '50px',
  medium: '75px',
  large: '100px',
};

interface Props {
  size?: LogoSizes;
  animate?: boolean;
}

const reelRotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

const AnimatedReel = css`
  animation: ${reelRotate} 2s linear infinite;
`;

const GradientFill = () => (
  <>
    <stop offset="0" stop-color="#ff94d8" stop-opacity="1" />
    <stop offset="0.26" stop-color="#af55f8" stop-opacity="1" />
    <stop offset="1" stop-color="#27edfe" stop-opacity="1" />
  </>
);

const Logo: Component<Props> = (_props) => {
  const props = mergeProps({ animate: false, size: 'small' } as const, _props);
  return (
    <svg
      width={SIZES[props.size]}
      viewBox="0 0 600 600"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      fill-rule="evenodd"
      clip-rule="evenodd"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-miterlimit="1.5"
    >
      <g id="Logo">
        <path
          d="M131.366,129.185C186.558,129.185 231.366,173.994 231.366,229.185C231.366,284.377 186.558,329.185 131.366,329.185C76.175,329.185 31.366,284.377 31.366,229.185C31.366,173.994 76.175,129.185 131.366,129.185ZM178.394,293.913C171.696,298.779 162.308,297.292 157.442,290.594C152.576,283.897 154.063,274.509 160.76,269.642C167.458,264.776 176.846,266.263 181.712,272.961C186.578,279.659 185.091,289.047 178.394,293.913ZM84.339,293.913C77.642,289.047 76.155,279.659 81.021,272.961C85.887,266.263 95.275,264.776 101.973,269.642C108.67,274.509 110.157,283.897 105.291,290.594C100.425,297.292 91.037,298.779 84.339,293.913ZM55.275,204.462C57.833,196.588 66.302,192.273 74.176,194.831C82.049,197.389 86.365,205.859 83.806,213.732C81.248,221.606 72.779,225.921 64.905,223.363C57.032,220.804 52.716,212.335 55.275,204.462ZM207.458,204.462C210.017,212.335 205.701,220.804 197.828,223.363C189.954,225.921 181.485,221.606 178.927,213.732C176.368,205.859 180.684,197.389 188.557,194.831C196.431,192.273 204.9,196.588 207.458,204.462ZM131.366,149.178C139.645,149.178 146.366,155.899 146.366,164.178C146.366,172.456 139.645,179.178 131.366,179.178C123.088,179.178 116.366,172.456 116.366,164.178C116.366,155.899 123.088,149.178 131.366,149.178Z"
          fill="url(#_Linear1)"
          style={{ 'transform-origin': '131.4px 229.2px' }}
          class={props.animate ? AnimatedReel : undefined}
        />
        <path
          d="M354.51,59.426C430.398,59.426 492.01,121.038 492.01,196.926C492.01,272.814 430.398,334.426 354.51,334.426C278.622,334.426 217.01,272.814 217.01,196.926C217.01,121.038 278.622,59.426 354.51,59.426ZM285.435,291.999C276.505,285.511 274.522,272.993 281.011,264.063C287.499,255.133 300.016,253.151 308.947,259.639C317.877,266.127 319.859,278.645 313.371,287.575C306.883,296.505 294.365,298.487 285.435,291.999ZM423.585,291.999C414.655,298.487 402.137,296.505 395.649,287.575C389.161,278.645 391.143,266.127 400.073,259.639C409.003,253.151 421.521,255.133 428.009,264.063C434.497,272.993 432.515,285.511 423.585,291.999ZM466.275,160.611C469.686,171.109 463.933,182.402 453.434,185.813C442.936,189.224 431.644,183.47 428.233,172.972C424.822,162.474 430.576,151.182 441.074,147.771C451.572,144.36 462.864,150.113 466.275,160.611ZM242.745,160.611C246.156,150.113 257.448,144.36 267.946,147.771C278.444,151.182 284.198,162.474 280.787,172.972C277.376,183.47 266.083,189.224 255.585,185.813C245.087,182.402 239.334,171.109 242.745,160.611ZM354.51,79.409C365.548,79.409 374.51,88.371 374.51,99.409C374.51,110.447 365.548,119.409 354.51,119.409C343.472,119.409 334.51,110.447 334.51,99.409C334.51,88.371 343.472,79.409 354.51,79.409Z"
          fill="url(#_Linear2)"
          style={{ 'transform-origin': '354.5px 196.9px' }}
          class={props.animate ? AnimatedReel : undefined}
        />
        <path
          id="Camera"
          d="M428.945,504.928L428.945,520.574C428.945,531.62 419.99,540.574 408.945,540.574C346.71,540.574 156.938,540.574 94.703,540.574C83.657,540.574 74.703,531.62 74.703,520.574C74.703,478.517 74.703,381.339 74.703,339.282C74.703,328.236 83.657,319.282 94.703,319.282C156.938,319.282 346.71,319.282 408.945,319.282C419.99,319.282 428.945,328.236 428.945,339.282L428.945,354.928L438.945,354.928C444.467,354.928 448.945,359.405 448.945,364.928L448.945,392.187L538.229,337.802C544.403,334.041 552.126,333.905 558.429,337.446C564.732,340.987 568.634,347.653 568.634,354.883C568.634,396.138 568.634,463.718 568.634,504.973C568.634,512.203 564.732,518.869 558.429,522.41C552.126,525.951 544.403,525.815 538.229,522.054L448.945,467.669L448.945,494.928C448.945,500.451 444.467,504.928 438.945,504.928L428.945,504.928Z"
          fill="#152031"
          stroke="#e6e3e3"
          stroke-width="2px"
        />
        <path
          id="Simile"
          d="M189.162,466.086C203.452,490.838 229.863,506.086 258.444,506.086C287.025,506.086 313.435,490.838 327.726,466.086L313.869,458.086C302.437,477.888 281.309,490.086 258.444,490.086C235.579,490.086 214.451,477.888 203.018,458.086L189.162,466.086Z"
          fill="url(#_Linear3)"
        />
      </g>
      <defs>
        <linearGradient
          id="_Linear1"
          x1="0"
          y1="0"
          x2="1"
          y2="0"
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(523.046,-31.565,31.565,523.046,45.5873,423.404)"
        >
          <GradientFill />
        </linearGradient>
        <linearGradient
          id="_Linear2"
          x1="0"
          y1="0"
          x2="1"
          y2="0"
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(523.046,-31.565,31.565,523.046,45.5873,423.404)"
        >
          <GradientFill />
        </linearGradient>
        <linearGradient
          id="_Linear3"
          x1="0"
          y1="0"
          x2="1"
          y2="0"
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(523.046,-31.565,31.565,523.046,45.5873,423.404)"
        >
          <GradientFill />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Logo;
