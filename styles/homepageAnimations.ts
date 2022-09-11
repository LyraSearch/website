export const HomepageAnimations = {
  tl: {
    animation: 'tl',
    left: '0',
    top: '0',
    animationDuration: '3s',
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
    '@keyframes tl': {
      '0%': {
        transform: 'translate(-50%, -50%)'
      },
      '50%': {
        transform: 'translate(-40%, -50%)'
      },
      '100%': {
        transform: 'translate(-50%, -50%)'
      }
    }
  },
  tr: {
    animation: 'tr',
    right: '0',
    top: '0',
    animationDuration: '8s',
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
    '@keyframes tr': {
      '0%': {
        transform: 'translate(50%, -20%)'
      },
      '50%': {
        transform: 'translate(0%, -30%)'
      },
      '100%': {
        transform: 'translate(50%, -20%)'
      }
    }
  },
  bl: {
    animation: 'bl',
    left: '0',
    bottom: '0',
    animationDuration: '5s',
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
    '@keyframes bl': {
      '0%': {
        transform: 'translate(-60%, 20%)'
      },
      '50%': {
        transform: 'translate(-50%, -20%)'
      },
      '100%': {
        transform: 'translate(-60%, 20%)'
      }
    }
  },
  br: {
    animation: 'br',
    right: '0',
    bottom: '0',
    animationDuration: '4s',
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
    '@keyframes br': {
      '0%': {
        transform: 'translate(50%, 50%)'
      },
      '50%': {
        transform: 'translate(80%, 20%)'
      },
      '100%': {
        transform: 'translate(50%, 50%)'
      }
    }
  },
  c: {
    animation: 'c',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    animationDuration: '4s',
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
    '@keyframes c': {
      '0%': {
        transform: 'scale(1)',
        backgroundColor: 'rgba(255, 255, 255, 0.5)'
      },
      '50%': {
        transform: 'scale(1.5)',
        backgroundColor: '#5220FF'
      },
      '100%': {
        transform: 'scale(1)',
        backgroundColor: 'rgba(255, 255, 255, 0.5)'
      }
    }
  }
}
