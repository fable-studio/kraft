const initState = {
  ids: ['theme-1', 'theme-2', 'theme-3'],
  count: 3,
  curSelected: 'theme-1',
  themeList: {
    'theme-1': {
      infograph: {
        background: '#ebeff2',
        palette: ['#ebeff2', '#525f65', '#bac2c5', '#eb6f68']
      },
      text: {
        header: {
          color: '#525f65'
        },
        title: {
          color: '#e96655'
        },
        body: {
          color: '#bac2c5'
        },
        quote: {
          color: '#e94939'
        }
      },
      chart: {
        generic: {
          palette: ['#800204', '#AC2423', '#ee4f52', '#ff5f5f', '#bac2c5']
        },
        title: {
          color: '#e96655'
        },
        subtitle: {
          color: '#e96655'
        }
      },
      map: {
        generic: {
          palette: ['#800204', '#AC2423', '#ee4f52', '#ff5f5f', '#bac2c5']
        },
        title: {
          color: '#e96655'
        },
        subtitle: {
          color: '#e96655'
        }
      },
      rating: {
        background: {
          backgroundColor: 'white'
        },
        progress: {
          backgroundColor: '#800204'
        },
        'progress-striped': {
          color: '#800204'
        },
        star: {
          color: '#800204'
        }
      }
    },
    'theme-2': {
      infograph: {
        background: '#f6efdf',
        palette: ['#493139', '#e56d53', '#eebb47', '#8ab6aa', '#eee2cc', '#bebebe']
      },
      text: {
        header: {
          color: '#493139'
        },
        title: {
          color: '#e56d53'
        },
        body: {
          color: '#bebebe'
        },
        quote: {
          color: '#e56d53'
        }
      },
      chart: {
        generic: {
          palette: ['#493139', '#e56d53', '#eebb47', '#8ab6aa']
        },
        title: {
          color: '#493139'
        },
        subtitle: {
          color: '#e56d53'
        }
      },
      map: {
        generic: {
          palette: ['#493139', '#e56d53', '#eebb47', '#8ab6aa']
        },
        title: {
          color: '#493139'
        },
        subtitle: {
          color: '#e56d53'
        }
      },
      rating: {
        background: {
          backgroundColor: 'white'
        },
        progress: {
          backgroundColor: '#493139'
        },
        'progress-striped': {
          color: '#493139'
        },
        star: {
          color: '#493139'
        }
      }
    },
    'theme-3': {
      infograph: {
        background: '#f6efdf',
        palette: ['#493139', '#e56d53', '#eebb47', '#8ab6aa', '#eee2cc', '#bebebe']
      },
      text: {
        header: {
          color: '#493139'
        },
        title: {
          color: '#e56d53'
        },
        body: {
          color: '#bebebe'
        },
        quote: {
          color: '#e56d53'
        }
      },
      chart: {
        generic: {
          palette: ['#493139', '#e56d53', '#eebb47', '#8ab6aa']
        },
        title: {
          color: '#493139'
        },
        subtitle: {
          color: '#e56d53'
        }
      },
      map: {
        generic: {
          palette: ['#493139', '#e56d53', '#eebb47', '#8ab6aa']
        },
        title: {
          color: '#493139'
        },
        subtitle: {
          color: '#e56d53'
        }
      },
      rating: {
        background: {
          backgroundColor: 'white'
        },
        progress: {
          backgroundColor: '#493139'
        },
        'progress-striped': {
          color: '#493139'
        },
        star: {
          color: '#493139'
        }
      }
    }
  }
};

const themeReducer = (state = initState, actions = {}) => {
  if (actions.type === 'CHANGE_THEME') {
    return {
      ...state,
      curSelected: actions.currentTheme
    };
  }
  return state;
};

export default themeReducer;
