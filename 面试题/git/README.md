# git 
代码版本管理工具, 对某个文件夹中的所有文件进行管理, 每个文件的修改, 删除, git 都能跟踪, 并可以追溯历史

git branch 查看所有本地分支
git branch -r 查看所有远程分支
git branch -a 查看所有分支
git branch -b xxx 创建xxx本地分支并切换到该分支


- 本地分支名需要和远程分支名一致 才能推送
git log 查看提交历史版本号
git log --oneline 查看提交历史简洁版
git reset --hard HEAD^ 回退到上一个版本
git reset --hard HEAD~n 回退到前n个版本
git reset --hard 版本号 回退到指定版本
git reflog 查看所有曾经执行过的 git 操作

git reset HEAD 文件名 将文件从暂存区撤回到工作区
git reset --soft HEAD^ 将此次的 commit 撤销, 文件回到暂存区

