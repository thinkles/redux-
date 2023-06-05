import React from 'react';

if (process.env.NODE_ENV === 'development') {
  console.log("first")
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React, {
    trackAllPureComponents: true,
  });
}
