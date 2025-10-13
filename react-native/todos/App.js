import React, { useState } from "react";
import {
    // 移动应用 没有WebView
    // 原生UI
    // UI html, android, ios UI语言不通用
    // rn 前端开发者html UI 理解快速的迁移到移动应用
    StyleSheet, // 样式表
    View,   // div  WebView 浏览器
    FlatList, // 列表组件
} from 'react-native'
import {
    Provider as PaperProvider,
    TextInput,
    Button,
    Checkbox,
    List
} from 'react-native-paper' // UI 组件

export default function App() {
    const [task, setTask] = useState('') // input 的数据
    const [todos, setTodos] = useState([
        {
            id: 1,
            text: '学习rn',
            done: false,
        }
    ]) // 列表的数据

    const addTodo = () => {
        if (!task.trim()) return;
        setTodos([
            ...todos,
            {
                id: Date.now().toString(),
                text: task,
                done: false,
            }
        ])
    }

    const toggleTodo = (id) => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, done: !todo.done } : todo))
    }

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id))
    }

    const renderItem = ({ item }) => {
        return (
            <List.Item
                title={item.text}
                left={
                    () => (
                        <Checkbox
                            status={item.done ? 'checked' : 'unchecked'}
                            onPress={() => toggleTodo(item.id)}
                        />
                    )
                }
                right={() => (
                    <Button onPress={() => deleteTodo(item.id)}>删除</Button>
                )}
            >
            </List.Item>
        )
    }


    return (
        <PaperProvider>
            <View style={styles.container}>
                {/* 更好看 */}
                <TextInput
                    label="输入待办事项"
                    value={task}
                    onChangeText={setTask}
                    style={styles.input}
                />
                <Button onPress={addTodo} style={styles.addButton}>添加</Button>
                {/* 不是网页, 移动App 特别注重性能 虚拟列表 */}
                <FlatList
                    data={todos}
                    keyExtractor={(item) => item.id}
                    style={styles.list}
                    renderItem={renderItem}
                />
            </View>
        </PaperProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        marginTop: 40,
    },
    input: {
        marginBottom: 10,
    },
    addButton: {
        marginBottom: 20,
    },
    list: {
        flex: 1,
    }
})