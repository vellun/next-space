"use client";

import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { authStore } from "@store/RootStore/AuthStore";
import { Button } from "@/shared/components/Button";
import { Input } from "@/shared/components/Input";
import { Text } from "@/shared/components/Text";
import { Meta } from "@utils/meta";
import { useRouter } from "next/navigation";
import { routesConfig } from "@/config";
import Link from "next/link";
import styles from "./auth.module.scss"; // Используем те же стили

const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleRegister = async () => {
        try {
            await authStore.register(email, password);
            router.push(routesConfig.astroObjects.create());
        } catch (e) {
            alert("Ошибка регистрации. Возможно, пользователь уже существует."); 
        }
    };

    if (authStore.isLoggedIn) {
        router.push(routesConfig.astroObjects.create());
        return null;
    }

    return (
        <div className={styles.authPage}>
            <Text view="title" tag="h1">Регистрация</Text>
            <Input 
                value={email} 
                onChange={setEmail} 
                placeholder="Email" 
            />
            <Input 
                value={password} 
                onChange={setPassword} 
                placeholder="Password" 
                type="password"
            />
            <Button 
                onClick={handleRegister} 
                loading={authStore.meta === Meta.loading} 
                disabled={!email}
            >
                Зарегистрироваться
            </Button>
            <Link href={routesConfig.login.create()}>
                <Text view="p-16" color="accent">Уже есть аккаунт? Войти</Text>
            </Link>
        </div>
    );
};

export default observer(RegisterPage);