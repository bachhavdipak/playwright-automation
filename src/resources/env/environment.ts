interface Environment {
  platform: {
    uk: {
      platform: {
        get: {
          base: {
            url: string;
          };
        };
        post: {
          base: {
            url: string;
          };
        };

        graphqlRequest: {
          post: {
            base: {
              graphqlUrl: string;
            };
          };
        };
      };
    };
  };

  dev: {
    uk: {
      example: {
        base: {
          url: string;
        };
      };
    };
  };

  uat: {
    uk: {
      base: {
        url: string;
      };
    };
    no: {
      base: {
        url: string;
      };
    };
    dk: {
      base: {
        url: string;
      };
    };
  };
}

const environments: Environment = {
  platform: {
    uk: {
      platform: {
        get: {
          base: {
            url: 'https://reqres.in/api',
          },
        },
        post: {
          base: {
            url: 'https://reqres.in',
          },
        },
        graphqlRequest: {
          post: {
            base: {
              graphqlUrl: 'https://countries.trevorblades.com',
            },
          },
        },
      },
    },
  },

  dev: {
    uk: {
      example: {
        base: {
          url: 'https://www.pdf995.com/samples/pdf.pdf',
        },
      },
    },
  },

  uat: {
    uk: {
      base: {
        url: 'https://duckduckgo.com/',
      },
    },
    no: {
      base: {
        url: 'https://duckduckgo.com/',
      },
    },
    dk: {
      base: {
        url: 'https://duckduckgo.com/',
      },
    },
  },
};

export default environments;
