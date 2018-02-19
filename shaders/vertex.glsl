attribute vec4 a_position;
attribute vec4 a_color;
varying vec4 fColor;
uniform mat4 u_viewMatrix;
void main()
{
    gl_Position = u_viewMatrix * a_position;
    gl_PointSize = 10.0;    
    fColor = a_color;
}