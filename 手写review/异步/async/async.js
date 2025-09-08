/**
 * 模拟 async/await 的函数实现
 * 核心原理：Generator 函数 + Promise 自动执行
 */

// 1. async 函数模拟器 - 将 Generator 函数转换为类似 async 函数的行为
function asyncFunction(generatorFunction) {
    return function(...args) {
        return new Promise((resolve, reject) => {
            // 创建生成器实例
            const generator = generatorFunction.apply(this, args);
            
            // 自动执行函数
            function step(nextValue) {
                let result;
                try {
                    result = generator.next(nextValue);
                } catch (error) {
                    // Generator 内部同步错误
                    return reject(error);
                }
                
                if (result.done) {
                    // Generator 执行完成，返回最终结果
                    return resolve(result.value);
                }
                
                // 将 yield 的值包装为 Promise
                Promise.resolve(result.value)
                    .then(step) // 成功时继续下一步
                    .catch(error => {
                        // 异步错误处理
                        try {
                            // 将错误传递给 Generator 内部
                            const errorResult = generator.throw(error);
                            if (errorResult.done) {
                                resolve(errorResult.value);
                            } else {
                                Promise.resolve(errorResult.value)
                                    .then(step)
                                    .catch(reject);
                            }
                        } catch (thrownError) {
                            // Generator 内部未捕获错误，直接拒绝
                            reject(thrownError);
                        }
                    });
            }
            
            // 开始执行
            step();
        });
    };
}

// 2. 工具函数：创建延迟 Promise
function delay(ms, value) {
    return new Promise(resolve => {
        setTimeout(() => resolve(value), ms);
    });
}

// 3. 工具函数：创建会失败的 Promise
function rejectAfter(ms, reason) {
    return new Promise((resolve, reject) => {
        setTimeout(() => reject(new Error(reason)), ms);
    });
}

// ===== 测试用例 =====

// 测试1：基本的异步操作
const testBasicAsync = asyncFunction(function* () {
    console.log('开始执行异步操作...');
    
    // 模拟 await delay(1000, 'Hello')
    const result1 = yield delay(1000, 'Hello');
    console.log('第一步结果:', result1);
    
    // 模拟 await delay(500, 'World')
    const result2 = yield delay(500, 'World');
    console.log('第二步结果:', result2);
    
    return `${result1} ${result2}!`;
});

// 测试2：错误处理 - Generator 内部捕获错误
const testErrorHandling = asyncFunction(function* () {
    console.log('\n测试错误处理...');
    
    try {
        // 这个 Promise 会失败
        const result = yield rejectAfter(500, '网络请求失败');
        console.log('不应该执行到这里:', result);
    } catch (error) {
        console.log('捕获到错误:', error.message);
        return '错误已处理，返回默认值';
    }
});

// 测试3：错误处理 - Generator 内部未捕获错误
const testUnhandledError = asyncFunction(function* () {
    console.log('\n测试未捕获错误...');
    
    // 这个错误不会被捕获，会导致整个函数 reject
    const result = yield rejectAfter(300, '未处理的错误');
    return result;
});

// 测试4：复杂的异步流程
const testComplexFlow = asyncFunction(function* (userId) {
    console.log('\n测试复杂异步流程...');
    
    try {
        // 模拟获取用户信息
        const user = yield delay(800, { id: userId, name: '张三' });
        console.log('获取用户信息:', user);
        
        // 模拟获取用户权限
        const permissions = yield delay(600, ['read', 'write']);
        console.log('获取用户权限:', permissions);
        
        // 模拟保存操作日志
        const logResult = yield delay(400, '日志保存成功');
        console.log('保存日志:', logResult);
        
        return {
            user,
            permissions,
            logResult,
            timestamp: Date.now()
        };
    } catch (error) {
        console.log('复杂流程中的错误:', error.message);
        throw error; // 重新抛出错误
    }
});

// ===== 执行测试 =====

async function runTests() {
    console.log('=== 开始测试自定义 async/await 实现 ===\n');
    
    try {
        // 测试1：基本异步操作
        const result1 = await testBasicAsync();
        console.log('测试1结果:', result1);
        
        // 测试2：错误处理（内部捕获）
        const result2 = await testErrorHandling();
        console.log('测试2结果:', result2);
        
        // 测试3：错误处理（未捕获）
        try {
            const result3 = await testUnhandledError();
            console.log('测试3结果:', result3);
        } catch (error) {
            console.log('测试3捕获到外部错误:', error.message);
        }
        
        // 测试4：复杂流程
        const result4 = await testComplexFlow(12345);
        console.log('测试4结果:', JSON.stringify(result4, null, 2));
        
    } catch (error) {
        console.error('测试过程中发生错误:', error);
    }
    
    console.log('\n=== 所有测试完成 ===');
}

// 启动测试
runTests();

// 导出函数供其他文件使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        asyncFunction,
        delay,
        rejectAfter
    };
}