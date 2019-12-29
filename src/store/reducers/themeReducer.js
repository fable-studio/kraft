import { cloneObject } from '../../utils';

const staticthemeList = {
  'theme-1': {
    generic: {
      palette: ['#ebeff2', '#525f65', '#bac2c5', '#eb6f68']
    },
    infograph: {
      background: '#ebeff2'
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
        backgroundColor: '#800204'
      },
      star: {
        color: '#800204'
      }
    }
  },
  'theme-2': {
    generic: {
      palette: ['#493139', '#e56d53', '#eebb47', '#8ab6aa', '#eee2cc', '#bebebe']
    },
    infograph: {
      background: '#f6efdf'
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
        backgroundColor: '#493139'
      },
      star: {
        color: '#493139'
      }
    }
  },
  'theme-3': {
    generic: {
      palette: ['#493139', '#e56d53', '#eebb47', '#8ab6aa', '#eee2cc', '#bebebe']
    },
    infograph: {
      background: '#2b3d50'
    },
    text: {
      header: {
        color: '#e4eaf1'
      },
      title: {
        color: '#d1ac18'
      },
      body: {
        color: '#e4eaf1'
      },
      quote: {
        color: '#e94939'
      }
    },
    chart: {
      generic: {
        palette: ['#eabd04', '#e94939', '#9955b4', '#4ab0f4']
      },
      title: {
        color: '#d1ac18'
      },
      subtitle: {
        color: '#e4eaf1'
      }
    },
    map: {
      generic: {
        palette: ['#eabd04', '#e94939', '#9955b4', '#4ab0f4']
      },
      title: {
        color: '#d1ac18'
      },
      subtitle: {
        color: '#e4eaf1'
      }
    },
    rating: {
      background: {
        backgroundColor: 'white'
      },
      progress: {
        backgroundColor: '#e94939'
      },
      'progress-striped': {
        backgroundColor: '#e94939'
      },
      star: {
        color: '#e94939'
      }
    }
  }
};

const initState = {
  ids: ['theme-1', 'theme-2', 'theme-3'],
  count: 3,
  curSelected: 'theme-1',
  themeList: {
    'theme-1': cloneObject(staticthemeList['theme-1']),
    'theme-2': cloneObject(staticthemeList['theme-2']),
    'theme-3': cloneObject(staticthemeList['theme-3'])
  }
};

const actions = {
  update_map_palette: (state, { newValue, index }) => {
    let themeList = state.themeList,
      curSelected = state.curSelected,
      theme = themeList[curSelected],
      map = theme.map,
      newPalette = Array.from(map.generic.palette);

    newPalette[index] = newValue;
    return {
      ...state,
      themeList: {
        ...themeList,
        [curSelected]: {
          ...themeList[curSelected],
          map: {
            ...map,
            generic: {
              ...map.generic,
              palette: newPalette
            }
          }
        }
      }
    };
  },
  update_full_theme: (state, { theme, id }) => {
    return {
      ...state,
      themeList: {
        ...state.themeList,
        [id]: cloneObject(theme)
      }
    };
  }
};

const themeReducer = (state = initState, action = {}) => {
  if (action.type === 'CHANGE_THEME') {
    return {
      ...state,
      curSelected: action.currentTheme
      // themeList: {
      //   ...state.themeList,
      //   [action.currentTheme]: cloneObject(staticthemeList[action.currentTheme])
      // }
    };
  } else if (actions[action.type]) {
    return actions[action.type](state, action);
  }
  return state;
};

export default themeReducer;
