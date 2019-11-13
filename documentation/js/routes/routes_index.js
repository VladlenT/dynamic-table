var ROUTES_INDEX = {
  name: '<root>',
  kind: 'module',
  className: 'AppModule',
  children: [
    {
      name: 'routes',
      filename: 'src/app/app-routing.module.ts',
      module: 'AppRoutingModule',
      children: [
        { path: '', pathMatch: 'full', component: 'AppComponent' },
        { path: 'page/:page', component: 'TableComponent' },
        { path: '**', redirectTo: '' },
      ],
      kind: 'module',
    },
  ],
};
