'use client';
import React, { useState } from 'react';

const SignupForm: React.FC = () => {
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (err !== '' || passWordErr !== '') {
            alert('에러확인');
        } else {
            handleLocalStorage();
        }
    };

    const [id, setId] = useState<string>();
    const [name, setName] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string | number>();
    const [confirmPassword, setConfirmPassword] = useState<string | number>();
    const [err, setErr] = useState<string>('');
    const [passWordErr, setPassWordErr] = useState<string>('');
    const user = {
        id: id,
        name: name,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
    };
    const handleLocalStorage = () => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="id">ID:</label>
                <input
                    id="id"
                    onChange={(e) => {
                        setId(e.currentTarget.value);
                    }}
                    required={true}
                    minLength={5}
                    maxLength={15}
                />
            </div>
            <div>
                <label htmlFor="name">Name:</label>
                <input
                    id="name"
                    onChange={(e) => {
                        setName(e.currentTarget.value);
                    }}
                    required={true}
                />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    id="email"
                    onChange={(e) => {
                        setEmail(e.currentTarget.value);
                    }}
                    type="email"
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    id="password"
                    onChange={(e) => {
                        const newPassword = e.currentTarget.value;
                        setPassword(newPassword);
                        const passwordRegex = /^[a-zA-Z0-9]+$/;
                        if (!passwordRegex.test(newPassword)) {
                            setPassWordErr('영문과 숫자만 입력해주세요.');
                        } else {
                            setPassWordErr('');
                        }
                    }}
                    required={true}
                    minLength={8}
                    maxLength={20}
                    type="password"
                />
            </div>
            <div>
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input
                    id="confirmPassword"
                    onChange={(e) => {
                        const newConfirmPassword = e.currentTarget.value;
                        setConfirmPassword(newConfirmPassword);
                        if (newConfirmPassword === password) {
                            setErr('');
                        } else {
                            setErr('비밀번호가 일치하지 않습니다.');
                        }
                    }}
                    required={true}
                    minLength={8}
                    maxLength={20}
                    type="password"
                />
            </div>
            <p style={{ color: 'red', fontSize: '12px' }}>{err}</p>

            <button type="submit">Submit</button>
        </form>
    );
};

export default SignupForm;
