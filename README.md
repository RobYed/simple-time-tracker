# simple-time-tracker
simple time tracking app based on Ionic and Firebase

## Ionic Lazy Loading Import Issue
Hi together. I’d like to add a module for some (dumb) components to my Ionic app. Unfortunately there seems to be an issue between lazy loading and using `IonicModule.forRoot` as I found out after heavy investigations (https://forum.ionicframework.com/t/alert-loading-select-etc-not-working-in-lazy-loaded-page/88808). What’s the path to take for my components module to be available within a lazy loaded page module?

Answer: Instead of `IonicModule.forRoot` only use `IonicModule`