export default function ThreeDots() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
            <path d="M12 18c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3zm0-9c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3zm0-9c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3z"></path>
        </svg>
    )
}

export function Crossmark() {
    return (
        <svg
        height="25"
        viewBox="0 0 25 25"
        width="25"
        strokeWidth='2'
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill="none" stroke="#dc1e1e" transform="translate(7 7)">
          <path d="m.5 10.5 10-10" />
          <path d="m10.5 10.5-10-10z" />
        </g>
      </svg>
    )
}

export function Checkmark() {
    return (
        <svg
        height="25"
        viewBox="0 0 25 25"
        width="25"
        strokeWidth='2'
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="m.5 5.5 3 3 8.028-8"
          fill="none"
          stroke="#4caf50"
          transform="translate(8 8)"
        />
      </svg>
    )
}