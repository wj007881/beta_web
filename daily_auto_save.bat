
cmd /c git add .
 
cmd /c git commit -m "daily auto save %date:~6,10%"
 
cmd /k git push -u origin master