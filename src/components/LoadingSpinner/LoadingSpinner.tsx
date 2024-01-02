
export interface LoadingSpinnerInterface { }

const LoadingSpinner: React.FC<LoadingSpinnerInterface> = () => {
  return (
    <div className="loading-box">
      <img
        className="loading-box__logo"
        src="/src/assets/sunshine.png"
        alt="sunshine-logo"
      />
      <div className="loading-box__spinner">
        <div className="loading-box__spinner__circle"></div>
        <div className="loading-box__spinner__circle"></div>
        <div className="loading-box__spinner__circle"></div>
        <div className="loading-box__spinner__circle"></div>
      </div>
    </div>
  )
}

export default LoadingSpinner