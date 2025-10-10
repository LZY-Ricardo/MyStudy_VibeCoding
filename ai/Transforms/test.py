from huggingface_hub import snapshot_download

snapshot_download(
    repo_id="uer/roberta-base-finetuned-jd-binary-chinese",
    local_dir="./roberta-base-finetuned-jd-binary-chinese",
    local_dir_use_symlinks=False
)