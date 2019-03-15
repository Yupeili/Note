# React优化  
+ uglify-js
+ performance
https://building.calibreapp.com/debugging-react-performance-with-react-16-and-chrome-devtools-c90698a522ad  
在项目地址栏内添加查询字符串 ?react_perf（例如， http://localhost:3000/?react_perf）
+ react window
+ chrome browser extension
+ PureComponent 
React 只是在should component里做了浅比较。如果状态和属性不能通过浅比较得出结论的时候，不推荐使用PureComponent。
+ react.lazy
The React.lazy function lets you render a `dynamic import` as a `regular component`.
+ Immutable 
+ cursor