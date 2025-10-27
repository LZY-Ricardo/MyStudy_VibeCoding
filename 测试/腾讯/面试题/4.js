// 1
<script>
    throw new Error('error');
    console.log(123);
</script>
// 执行结果
// 控制台显示错误 不打印123


// 2
{/* <script>
throw new Error('error');
</script>
<script>
console.log(123);
</script> */}
// 执行结果
// 控制台显示错误 打印123