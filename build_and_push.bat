chcp 65001
@ECHO OFF
git submodule init

git submodule update

pip install -r requirements.txt

python main.py

echo 键入任意命令来执行push操作

pause

git add .

git commit -m "%date% %time%"

git push

pause