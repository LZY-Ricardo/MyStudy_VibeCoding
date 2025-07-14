import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'   

// 创建子模块
const questional = createSlice({
    name: 'questional',
    initialState: {
        questions: [],
        answersId: [] as number[],
        result: {
            grade: 0,
            desc: ''
        }
    },
    reducers: {
        setQuestions(state, action) {
            state.questions = action.payload
        },
        setAnswersId(state, action:PayloadAction<number>) {
            console.log('Adding answer ID:', action.payload);
            console.log('Current answersId length:', state.answersId.length);
            state.answersId.push(action.payload);
            console.log('Updated answersId length:', state.answersId.length);
        },
        getResult(state) {
            const resultGrades = [
                { grade: 0, desc: '炼气都摸不着边' },
                { grade: 40, desc: '筑基门槛刚够着' },
                { grade: 60, desc: '金丹期算稳当了' },
                { grade: 80, desc: '元婴期显神通了' },
                { grade: 100, desc: '化神境独一档啊' }
            ];
            
            const { questions, answersId } = state;
            const total = questions.length;
            
            // 处理没有问题的情况，避免除以零
            if (total === 0) {
                state.result = { grade: 0, desc: '暂无数据' };
                return;
            }
            
            // 处理没有答案的情况
            if (!answersId || answersId.length === 0) {
                state.result = { grade: 0, desc: '暂无答案' };
                return;
            }
            
            const rightArray = [] as number[]
            questions.forEach(item => {
                const right = item.topic_answer?.find(answer => answer.is_standard_answer === 1)
                if (right) {
                    rightArray.push(right.topic_answer_id)
                }
            });
            
            const rightCount = rightArray.filter(id => answersId.includes(id)).length
            // 计算分数并保留一位小数
            const grade = parseFloat(((rightCount / total) * 100).toFixed(1))
            
            // 找到最接近的等级描述
            let closestResult = resultGrades[0];
            for (const item of resultGrades) {
                if (Math.abs(item.grade - grade) < Math.abs(closestResult.grade - grade)) {
                    closestResult = item;
                }
            }
            
            // 使用计算出的实际分数和最接近的描述
            state.result = { 
                grade: grade, 
                desc: closestResult.desc 
            };
            
            // 调试信息
            console.log('正确答案ID列表:', rightArray);
            console.log('用户答案ID列表:');
            console.log(answersId);
            console.log('答对数量:', rightCount);
            console.log('总题数:', total);
            console.log('得分:', grade);
            console.log('最终结果:', state.result);
        }
    }
})

const { setQuestions, setAnswersId, getResult } = questional.actions
export { setQuestions, setAnswersId, getResult }


export default questional.reducer
