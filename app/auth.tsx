import { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";

export default function AuthScreen() {
    const [isSignUp, setIsSignUp] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    const [error, setError] = useState<string|null>("");
    const theme = useTheme();

    // Custom blue colors
    const blueTheme = {
        primary: "#1E88E5",  // Medium blue
        accent: "#42A5F5",   // Lighter blue
        background: "#E3F2FD", // Very light blue background
        text: "#0D47A1",     // Dark blue for text
        buttonText: "#FFFFFF" // White text for buttons
    };

    const handleSwitchMode = () => {
        setIsSignUp((prev) => !prev);
        setError(null)
    };

    const validateEmail = (email: string): boolean => {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
    };

    const validatePassword = (password: string): { valid: boolean; message?: string } => {
        if (password.length < 8) {
            return { valid: false, message: "Password must be at least 8 characters long" };
        }
        if (!/[A-Z]/.test(password)) {
            return { valid: false, message: "Password must contain at least one uppercase letter" };
        }
        if (!/[a-z]/.test(password)) {
            return { valid: false, message: "Password must contain at least one lowercase letter" };
        }
        if (!/[0-9]/.test(password)) {
            return { valid: false, message: "Password must contain at least one number" };
        }
        if (!/[^A-Za-z0-9]/.test(password)) {
            return { valid: false, message: "Password must contain at least one special character" };
        }
        return { valid: true };
    };

    const handleSubmit = () => {
        // Reset error
        setError(null);

        // Check for empty fields
        if (!email || !password) {
            setError("Please fill in all fields.");
            return;
        }

        // Validate email format
        if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        // Password validation (only for sign up)
        if (isSignUp) {
            const passwordValidation = validatePassword(password);
            if (!passwordValidation.valid) {
                setError(passwordValidation.message || "Invalid password");
                return;
            }
        }

        // For sign in, just check minimum length
        if (!isSignUp && password.length < 6) {
            setError("Password must be at least 6 characters long");
            return;
        }

        // If all validations pass
        console.log({ email, password, isSignUp });
        // Here you would typically call your authentication API
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={[styles.container, { backgroundColor: blueTheme.background }]}
            keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
        >
            <View style={styles.innerContainer}>
                <Text variant="headlineMedium" style={[styles.title, { color: blueTheme.text }]}>
                    {isSignUp ? "Create Account" : "Welcome Back"}
                </Text>

                <TextInput
                    label="Email"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    placeholder="example@gmail.com"
                    keyboardType="email-address"
                    mode="outlined"
                    style={styles.input}
                    theme={{
                        colors: {
                            primary: blueTheme.primary,
                            accent: blueTheme.accent,
                            background: "#FFFFFF"
                        }
                    }}
                    left={<TextInput.Icon icon="email" color={blueTheme.primary} />}
                />

                <TextInput
                    label="Password"
                    value={password}
                    onChangeText={setPassword}
                    autoCapitalize="none"
                    placeholder="Password"
                    secureTextEntry={!isPasswordVisible}
                    mode="outlined"
                    style={styles.input}
                    theme={{
                        colors: {
                            primary: blueTheme.primary,
                            accent: blueTheme.accent,
                            background: "#FFFFFF"
                        }
                    }}
                    left={<TextInput.Icon icon="lock" color={blueTheme.primary} />}
                    right={
                        <TextInput.Icon
                            icon={isPasswordVisible ? "eye-off" : "eye"}
                            color={blueTheme.primary}
                            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                        />
                    }
                />
                {error &&
                    <Text style={{color:theme.colors.error}}>
                        {error}
                    </Text>
                }

                <Button
                    mode="contained"
                    onPress={handleSubmit}
                    style={[styles.button, { backgroundColor: blueTheme.primary }]}
                    labelStyle={[styles.buttonLabel, { color: blueTheme.buttonText }]}
                >
                    {isSignUp ? "Sign Up" : "Sign In"}
                </Button>

                <Button
                    mode="text"
                    onPress={handleSwitchMode}
                    style={styles.switchButton}
                    labelStyle={[styles.switchButtonLabel, { color: blueTheme.text }]}
                >
                    {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
                </Button>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        marginBottom: 30,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    input: {
        marginBottom: 15,
        backgroundColor: '#FFFFFF',
    },
    button: {
        marginTop: 10,
        paddingVertical: 8,
        borderRadius: 4,
    },
    buttonLabel: {
        fontSize: 16,
    },
    switchButton: {
        marginTop: 15,
    },
    switchButtonLabel: {
        fontSize: 14,
    },
});