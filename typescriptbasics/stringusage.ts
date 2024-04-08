class StringUtil {
    // Function to capitalize the first letter of a string
    capitalizeFirstLetter(str: string): string {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    // Function to reverse a string
    reverseString(str: string): string {
        return str.split('').reverse().join('');
    }

    // Function to check if a string is a palindrome
    isPalindrome(str: string): boolean {
        const reversed = this.reverseString(str);
        return str.toLowerCase() === reversed.toLowerCase();
    }

    // Function to truncate a string to a specified length
    truncateString(str: string, maxLength: number): string {
        if (str.length <= maxLength) {
            return str;
        } else {
            return str.slice(0, maxLength) + '...';
        }
    }

    // Function to count the occurrences of a substring in a string
    countOccurrences(str: string, subStr: string): number {
        const regex = new RegExp(subStr, 'g');
        const matches = str.match(regex);
        return matches ? matches.length : 0;
    }

    // Function to demonstrate string interpolation with literals
    interpolateString(name: string, age: number): string {
        return `Hello, my name is ${name} and I am ${age} years old.`;
    }
}

// Sample usage
const stringUtil = new StringUtil();
console.log(stringUtil.capitalizeFirstLetter('hello')); // Output: Hello
console.log(stringUtil.reverseString('world')); // Output: dlrow
console.log(stringUtil.isPalindrome('radar')); // Output: true
console.log(stringUtil.truncateString('Lorem ipsum dolor sit amet', 10)); // Output: Lorem ipsu...
console.log(stringUtil.countOccurrences('hello world hello', 'hello')); // Output: 2
console.log(stringUtil.interpolateString('John', 30)); // Output: Hello, my name is John and I am 30 years old.