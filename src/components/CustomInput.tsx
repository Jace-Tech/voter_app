import { View, Text, TextInput, StyleProp, TextStyle, StyleSheet, Pressable, KeyboardTypeOptions } from 'react-native'
import React from 'react'
import { Control, Controller, useController, ValidationRule } from 'react-hook-form'
import { ASHY, BLACK, GRAY, RED } from '../utils/colors'
import useBoolean from '../hooks/useBoolean';
import { capitalizeWord } from '../utils/helpers';

interface CustomInputProps {
  control: Control | any;
  name: string;
  rules: ValidationRule | any;
  type: KeyboardTypeOptions | undefined;
  styleProp?: StyleProp<TextStyle>,
  placeholder?: string;
  hasChild?: boolean;
  password?: boolean;
  addon?: any;
  handleClickAddon?: () => void;
}

const CustomInput: React.FC<CustomInputProps> = ({ rules, control, name, styleProp, hasChild, addon, handleClickAddon, type, password, placeholder }) => {
  const { field: { onChange, value, onBlur, ref }, formState: { errors } } = useController({
    control,
    defaultValue: '',
    name,
    rules
  })
  if (hasChild) return (
    <View>
      <View style={[styles.inputGroup, { borderColor: errors?.[name] ? RED : ASHY }]}>
        <TextInput
          keyboardType={type || 'default'}
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          ref={ref}
          placeholder={placeholder || ""}
          secureTextEntry={password}
          style={[styles.passInput]}
          cursorColor={ASHY}
        />

        <Pressable
          style={styles.iconButton}
          onPress={handleClickAddon}
        >
          {addon}
        </Pressable>
      </View>
      {errors?.[name]?.type === "required" ? (
        <Text style={styles.inputTextError}>{capitalizeWord(name)} is required</Text>
      ) : errors?.[name]?.message && (
        <Text style={styles.inputTextError}>{errors?.[name]?.message as string}</Text>
      )}
    </View>
  )

  return (
    <View>
      <TextInput
        keyboardType={type || 'default'}
        placeholder={placeholder || ""}
        style={[styles.input, { borderColor: errors?.[name] ? RED : ASHY }]}
        cursorColor={ASHY}
        ref={ref}
        onBlur={onBlur}
        onChangeText={onChange}
        value={value}
      />

      {errors?.[name]?.type === "required" ? (
        <Text style={styles.inputTextError}>{capitalizeWord(name)} is required</Text>
      ) : errors?.[name]?.message && (
        <Text style={styles.inputTextError}>{errors?.[name]?.message as string}</Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    padding: 12,
    borderRadius: 4,
    fontSize: 15,
    borderColor: ASHY,
    color: BLACK,
    marginVertical: 8
  },
  passInput: {
    padding: 12,
    flex: 1
  },
  inputGroup: {
    flexDirection: 'row',
    marginVertical: 8,
    borderRadius: 4,
    borderColor: ASHY,
    borderWidth: 1,
  },
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },
  inputError: {
    borderColor: RED
  },
  inputTextError: {
    color: RED,
    fontSize: 12
  }
})

export default CustomInput