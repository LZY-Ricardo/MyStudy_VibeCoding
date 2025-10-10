from huggingface_hub import snapshot_download

# 注意：local_dir_use_symlinks参数已被弃用，huggingface_hub库已更新下载机制
# 现在只需要指定local_dir参数，不需要再设置符号链接相关参数
snapshot_download(
    repo_id="uer/roberta-base-finetuned-jd-binary-chinese",
    local_dir="./roberta-base-finetuned-jd-binary-chinese"
)
