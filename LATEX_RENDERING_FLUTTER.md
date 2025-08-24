# LaTeX Rendering Support for Flutter Apps 🎯

## Overview
The API now includes built-in LaTeX rendering support that converts mathematical expressions from LaTeX format to Unicode or HTML, making it easy to display math content in Flutter apps without requiring additional LaTeX rendering libraries.

## 🚀 Quick Start

### Basic Usage
Simply add `latex_format` parameter to your API request:

```dart
// Flutter example
final response = await http.post(
  Uri.parse('https://your-api-url/v1/chat/completions'),
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY',
  },
  body: jsonEncode({
    'model': 'any-model',
    'messages': [
      {'role': 'user', 'content': 'Explain the quadratic formula'}
    ],
    'latex_format': 'unicode', // ← Enable LaTeX rendering
  }),
);
```

## 📝 LaTeX Format Options

| Format | Description | Best For |
|--------|-------------|----------|
| `unicode` | Converts LaTeX to Unicode symbols (default) | Flutter apps, mobile displays |
| `html` | Converts to HTML with sup/sub tags | Web views, HTML rendering |
| `keep` | No conversion, keeps original LaTeX | Custom LaTeX renderers |
| `none` | Same as `keep` | Backward compatibility |

## 🔢 Supported LaTeX Features

### 1. **Inline Math**
- Format: `$...$` or `\(...\)`
- Example: `$x^2 + y^2 = z^2$` → `x² + y² = z²`

### 2. **Display Math**
- Format: `$$...$$` or `\[...\]`
- Example: `$$\frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$$`
- Renders as: `(-b ± √(b² - 4ac))/(2a)`

### 3. **Greek Letters**
```
\alpha → α    \beta → β     \gamma → γ    \delta → δ
\epsilon → ε  \theta → θ    \lambda → λ   \mu → μ
\pi → π       \sigma → σ    \omega → ω    \Omega → Ω
```

### 4. **Mathematical Operators**
```
\pm → ±       \times → ×    \div → ÷      \cdot → ·
\leq → ≤      \geq → ≥      \neq → ≠      \approx → ≈
\infty → ∞    \partial → ∂  \nabla → ∇    \sum → ∑
```

### 5. **Fractions**
- `\frac{a}{b}` → `(a)/(b)`
- Example: `\frac{1}{2}` → `(1)/(2)`

### 6. **Superscripts & Subscripts**
- Superscript: `x^2` → `x²`, `x^{10}` → `x¹⁰`
- Subscript: `x_1` → `x₁`, `a_{n}` → `aₙ`

### 7. **Square Roots**
- `\sqrt{x}` → `√(x)`
- Example: `\sqrt{16}` → `√(16)`

### 8. **Common Sets**
```
\mathbb{R} → ℝ (Real numbers)
\mathbb{N} → ℕ (Natural numbers)
\mathbb{Z} → ℤ (Integers)
\mathbb{C} → ℂ (Complex numbers)
```

## 💻 Flutter Implementation Examples

### Example 1: Simple Math Display
```dart
class MathDisplay extends StatelessWidget {
  final String mathContent;
  
  @override
  Widget build(BuildContext context) {
    return Text(
      mathContent, // Already converted from LaTeX by API
      style: TextStyle(
        fontSize: 18,
        fontFamily: 'Courier', // Monospace for better alignment
      ),
    );
  }
}
```

### Example 2: Complete Flutter Integration
```dart
import 'dart:convert';
import 'package:http/http.dart' as http;

class MathChatService {
  static const String apiUrl = 'https://your-api-url/v1/chat/completions';
  static const String apiKey = 'YOUR_API_KEY';
  
  Future<String> askMathQuestion(String question) async {
    try {
      final response = await http.post(
        Uri.parse(apiUrl),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $apiKey',
        },
        body: jsonEncode({
          'model': 'default',
          'messages': [
            {
              'role': 'system',
              'content': 'You are a math tutor. Use LaTeX for all mathematical expressions.'
            },
            {'role': 'user', 'content': question}
          ],
          'latex_format': 'unicode', // Automatic LaTeX conversion
          'stream': false,
        }),
      );
      
      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        return data['choices'][0]['message']['content'];
      } else {
        throw Exception('Failed to get response');
      }
    } catch (e) {
      throw Exception('Error: $e');
    }
  }
}

// Usage in Flutter Widget
class MathChatWidget extends StatefulWidget {
  @override
  _MathChatWidgetState createState() => _MathChatWidgetState();
}

class _MathChatWidgetState extends State<MathChatWidget> {
  final _service = MathChatService();
  String _response = '';
  bool _isLoading = false;
  
  void _askQuestion(String question) async {
    setState(() {
      _isLoading = true;
    });
    
    try {
      final answer = await _service.askMathQuestion(question);
      setState(() {
        _response = answer; // Already has LaTeX converted to Unicode
        _isLoading = false;
      });
    } catch (e) {
      setState(() {
        _response = 'Error: $e';
        _isLoading = false;
      });
    }
  }
  
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        // Question input
        TextField(
          onSubmitted: _askQuestion,
          decoration: InputDecoration(
            hintText: 'Ask a math question...',
          ),
        ),
        
        // Loading indicator
        if (_isLoading)
          CircularProgressIndicator(),
        
        // Response display with math symbols
        if (_response.isNotEmpty)
          Card(
            child: Padding(
              padding: EdgeInsets.all(16),
              child: SelectableText(
                _response,
                style: TextStyle(fontSize: 16),
              ),
            ),
          ),
      ],
    );
  }
}
```

### Example 3: Streaming with LaTeX
```dart
Stream<String> streamMathResponse(String question) async* {
  final request = http.Request('POST', Uri.parse(apiUrl));
  request.headers.addAll({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer $apiKey',
  });
  
  request.body = jsonEncode({
    'model': 'default',
    'messages': [{'role': 'user', 'content': question}],
    'latex_format': 'unicode',
    'stream': true,
  });
  
  final response = await request.send();
  final stream = response.stream.transform(utf8.decoder);
  
  await for (final chunk in stream) {
    // Parse SSE chunks and extract content
    // LaTeX is already converted in the stream
    yield chunk;
  }
}
```

## 🎨 Display Tips for Flutter

### 1. **Use Appropriate Fonts**
```dart
Text(
  mathContent,
  style: TextStyle(
    fontFamily: Platform.isIOS ? 'Courier' : 'monospace',
    fontSize: 18,
  ),
)
```

### 2. **Handle Special Characters**
Ensure your Flutter app supports Unicode:
```yaml
# pubspec.yaml
flutter:
  fonts:
    - family: MathFont
      fonts:
        - asset: fonts/NotoSansMath-Regular.ttf
```

### 3. **Selectable Text for Copying**
```dart
SelectableText(
  mathContent,
  style: TextStyle(fontSize: 16),
  toolbarOptions: ToolbarOptions(
    copy: true,
    selectAll: true,
  ),
)
```

## 🧪 Testing Examples

### Test Request 1: Quadratic Formula
```json
{
  "model": "default",
  "messages": [
    {"role": "user", "content": "Write the quadratic formula in LaTeX"}
  ],
  "latex_format": "unicode"
}
```
**Expected Output:** `x = (-b ± √(b² - 4ac))/(2a)`

### Test Request 2: Calculus
```json
{
  "model": "default",
  "messages": [
    {"role": "user", "content": "What is the derivative of $x^n$?"}
  ],
  "latex_format": "unicode"
}
```
**Expected Output:** `The derivative is nxⁿ⁻¹`

### Test Request 3: Greek Letters
```json
{
  "model": "default",
  "messages": [
    {"role": "user", "content": "Express $\\alpha + \\beta = \\gamma$"}
  ],
  "latex_format": "unicode"
}
```
**Expected Output:** `α + β = γ`

## 🔧 Advanced Configuration

### Custom Processing
If you need the raw LaTeX for custom rendering:
```dart
// Get raw LaTeX (no conversion)
final response = await makeApiCall({
  'latex_format': 'keep', // Preserves original LaTeX
});

// Then use a Flutter LaTeX package like flutter_math_fork
```

### HTML Format for WebView
```dart
// For displaying in WebView
final response = await makeApiCall({
  'latex_format': 'html',
});

// Display in WebView
WebView(
  initialUrl: 'data:text/html;charset=utf-8,' + 
    Uri.encodeComponent('<html><body>$response</body></html>'),
);
```

## 📊 Performance Benefits

1. **No Client-Side Processing** - LaTeX conversion happens on the server
2. **Reduced App Size** - No need for LaTeX rendering libraries
3. **Faster Display** - Direct Unicode text rendering
4. **Better Accessibility** - Plain text is screen-reader friendly
5. **Easy Copying** - Users can copy math formulas as text

## 🐛 Troubleshooting

### Issue: Math symbols not displaying correctly
**Solution:** Ensure your Flutter app uses a font that supports mathematical Unicode symbols.

### Issue: Complex equations look misaligned
**Solution:** Use a monospace font for better alignment of fractions and equations.

### Issue: Need more advanced LaTeX features
**Solution:** Set `latex_format: 'keep'` and use a dedicated Flutter LaTeX package.

## 🚀 Benefits for Flutter Apps

- ✅ **No Additional Dependencies** - Works with standard Text widgets
- ✅ **Lightweight** - No heavy LaTeX rendering libraries needed
- ✅ **Fast Rendering** - Native text rendering is faster than LaTeX parsing
- ✅ **Cross-Platform** - Works on iOS, Android, Web, Desktop
- ✅ **Searchable** - Rendered text is searchable unlike LaTeX images
- ✅ **Accessible** - Screen readers can read the Unicode text
- ✅ **Copyable** - Users can copy formulas to other apps

## 📝 Summary

The built-in LaTeX rendering makes it trivial to display mathematical content in Flutter apps. Just add `"latex_format": "unicode"` to your API requests, and mathematical expressions will be automatically converted to displayable Unicode text. No additional Flutter packages or complex rendering logic required! 🎉