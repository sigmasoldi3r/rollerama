
/**
 * Compiles an input template to the output format.
 *
 * You can override and provide functions via values option.
 * @param template The template to be compiled.
 * @param values Values to be sent to the compiler.
 * @returns The result of compiling the template
 */
export function compile(template: string, values?: Record<string, any>): string;