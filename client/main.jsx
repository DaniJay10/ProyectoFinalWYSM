import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; 
import App from '../imports/ui/App';

Meteor.startup(() => {
  const container = document.getElementById('app');
  const root = createRoot(container);
  root.render(
    <BrowserRouter><App /></BrowserRouter>
  );
});
