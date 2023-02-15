declare global {
  function navigate(name: string): void;
  function goBack(): void;
  function reset({index: number, routes: [{name: string}]}): void;
  var navigation: any;
  var token: string | null;
  var barHeight: number;
  var headerHeight: number;
  var userInfo: any;
}

export {};
