import { cloneObject } from '../../utils';

const staticthemeList = {
  'theme-1': {
    infograph: {
      background: '#ebeff2'
    },
    text: {
      generic: {
        palette: ['#ebeff2', '#525f65', '#bac2c5', '#eb6f68']
      },
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
      text: {
        generic: {
          palette: ['#ebeff2', '#525f65', '#bac2c5', '#eb6f68']
        },
        title: {
          color: '#800204'
        },
        subtitle: {
          color: '#525f65'
        }
      }
    },
    map: {
      generic: {
        palette: ['#800204', '#AC2423', '#ee4f52', '#ff5f5f', '#bac2c5']
      },
      text: {
        generic: {
          palette: ['#ebeff2', '#525f65', '#bac2c5', '#eb6f68']
        },
        title: {
          color: '#800204'
        },
        subtitle: {
          color: '#e96655'
        }
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
    },
    'tag-text': {
      background: {
        backgroundColor: 'white'
      },
      orderText: {
        backgroundColor: '#800204'
      },
      title: {
        color: '#e96655'
      },
      content: {
        color: '#e96655'
      }
    },
    credit: {
      background: {
        backgroundColor: 'white',
        border: '1px solid #ebeff2'
      },
      text: {
        color: '#222f25'
      }
    }
  },
  'theme-2': {
    infograph: {
      background: '#f6efdf'
    },
    text: {
      generic: {
        palette: ['#493139', '#e56d53', '#eebb47', '#8ab6aa', '#eee2cc', '#bebebe']
      },
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
      text: {
        generic: {
          palette: ['#493139', '#e56d53', '#eebb47', '#8ab6aa', '#eee2cc', '#bebebe']
        },
        title: {
          color: '#493139'
        },
        subtitle: {
          color: '#e56d53'
        }
      }
    },
    map: {
      generic: {
        palette: ['#493139', '#e56d53', '#eebb47', '#8ab6aa']
      },
      text: {
        generic: {
          palette: ['#493139', '#e56d53', '#eebb47', '#8ab6aa', '#eee2cc', '#bebebe']
        },
        title: {
          color: '#493139'
        },
        subtitle: {
          color: '#e56d53'
        }
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
    },
    'tag-text': {
      background: {
        backgroundColor: 'white'
      },
      orderText: {
        backgroundColor: '#493139'
      },
      title: {
        color: '#493139'
      },
      content: {
        color: '#e56d53'
      }
    },
    credit: {
      background: {
        backgroundColor: 'white',
        border: '1px solid #f6efdf'
      },
      text: {
        color: '#222f25'
      }
    }
  },
  'theme-3': {
    infograph: {
      background: '#2b3d50'
    },
    text: {
      generic: {
        palette: ['#493139', '#e56d53', '#eebb47', '#8ab6aa', '#eee2cc', '#bebebe']
      },
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
      text: {
        generic: {
          palette: ['#e4eaf1', '#d1ac18', '#493139', '#e56d53', '#eebb47', '#8ab6aa', '#eee2cc', '#bebebe']
        },
        title: {
          color: '#e4eaf1'
        },
        subtitle: {
          color: '#d1ac18'
        }
      }
    },
    map: {
      generic: {
        palette: ['#eabd04', '#e94939', '#9955b4', '#4ab0f4']
      },
      text: {
        generic: {
          palette: ['#e4eaf1', '#d1ac18', '#493139', '#e56d53', '#eebb47', '#8ab6aa', '#eee2cc', '#bebebe']
        },
        title: {
          color: '#d1ac18'
        },
        subtitle: {
          color: '#e4eaf1'
        }
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
    },
    'tag-text': {
      background: {
        backgroundColor: '#2b3d50'
      },
      orderText: {
        backgroundColor: '#e94939'
      },
      title: {
        color: '#d1ac18'
      },
      content: {
        color: '#e4eaf1'
      }
    },
    credit: {
      background: {
        backgroundColor: 'white',
        border: '1px solid #2b3d50'
      },
      text: {
        color: '#222f25'
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
