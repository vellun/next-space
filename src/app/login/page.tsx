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
import styles from "./auth.module.scss";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = async () => {
        try {
            await authStore.login(email, password);
            router.push(routesConfig.astroObjects.create());
        } catch (e) {
            alert("Ошибка входа. Проверьте данные.");
        }
    };

    if (authStore.isLoggedIn) {
        router.push(routesConfig.astroObjects.create());
        return null;
    }

    return (
        <div className={styles.authPage}>
            <Text view="title" tag="h1">Войти</Text>
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
                onClick={handleLogin} 
                loading={authStore.meta === Meta.loading} 
                disabled={!email || !password}
            >
                Войти
            </Button>
            <Link href={routesConfig.register.create()}>
                <Text view="p-16" color="accent">Нет аккаунта? Зарегистрироваться</Text>
            </Link>
        </div>
    );
};

export default observer(LoginPage);